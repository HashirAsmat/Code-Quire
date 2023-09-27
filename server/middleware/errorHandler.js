import joi from 'joi';
const { ValidationError } = joi;

const errorHandler = (error, req, res, next) => {
    //default error
    let status = 500;
    let data = {
        message: "internal server Error"
    }

    //check if error is validation error
    if (error instanceof ValidationError) {
        status = 401;
        data.message = error.message;
        return res.status(status).json(data)

    }

    //if error is other than validation Error
    if (error.status) {
        data.status = error.status;
    }
    if (error.message) {
        data.message = error.message;
    }
    return res.status(status).json(data);
}

export default errorHandler;


// In Express.js middleware functions, the standard order of arguments is (error, req, res, next):
// error: This argument holds the error object that is passed to the middleware function when an error occurs in any previous middleware or route handler.
// req: The request object.
// res: The response object.
// next: The function that triggers the next middleware or route handler.

// Express recognizes that a middleware function has error handling capabilities by checking if the function has four arguments.
// If you define a middleware function with these four arguments, Express will consider it as an error handling middleware.
// This middleware will only be executed when an error is passed to it through the next() function in the previous middleware or route handler.