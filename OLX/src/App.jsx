import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Profile from "./Pages/Profile"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";


function App() {
  return (
    <>
      <AuthProvider > 
        <ToastContainer position="top-center" />
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App