import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/index.js';
import connectionBD from './Database/index.js';
import bodyParser from 'body-parser';
import { register } from './controller/auth.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
const app = express();

//Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '50mb', extended: 'true' }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
// app.use(express.urlencoded({extended:false}));

/* File Storage : it is recommended to read multer documentation regarding uploading pic files */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

//Database connection
connectionBD();

//the particular route where u are uploading a pic file should not exists in route folder (time-> 43:52)
/* Routes with files*/
app.post('/auth/register', upload.single('picture'), register)

//Routes
app.use('/auth', authRoutes);


app.use(errorHandler);
app.listen(config.PORT || 6001, () => {
    console.log(`listening on port:${config.PORT}`)
});

//express.json() is recommended for JSON parsing in modern versions of Express (4.16.0 and later). It provides similar functionality to body-parser.json() but is more integrated into the Express framework
// for multer concept , see this video -> Uploading Files with NodeJS and Multer (piyush Garg) , Documentation is mostly recommended....
