import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";

import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import Profile from "./pages/profilePage/Profile";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/profile/:userId' element={<Profile/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


























