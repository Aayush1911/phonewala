import Login from "./Component/Login/Login"
import Navbar from "./Component/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from "./Component/Signup/Signup"
import Homepage from "./Component/Homepage/Homepage"
import Cart from "./Component/Cart/Cart"
import Description from "./Component/Description/Description"
import UserProfile from "./Component/Profile/UserProfile"
import { useState } from "react"
import Alert from "./Component/Alert/Alert"

function App() {
  const[alert,setalert]=useState(null)

  const showalert=(message,type)=>{
    setalert({
      message:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null)
    },2000)
  }
  return (
    <><Router>
      <Navbar showalert={showalert} />
      <Alert alert={alert}/>
        <Routes>
          <Route path='/login' element={<Login showalert={showalert}/>} />
        </Routes>
        <Routes>
          <Route path='/signup' element={<Signup showalert={showalert} />} />
        </Routes>
        <Routes>
          <Route path='/cart' element={<Cart showalert={showalert}/>} />
        </Routes>
        <Routes>
          <Route path='/description/:id' element={<Description showalert={showalert}/>} />
        </Routes>
        <Routes>
          <Route path='/profile' element={<UserProfile/>} />
        </Routes>
        <Routes>
          <Route path='/mobile/:category' element={<Homepage showalert={showalert} />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Homepage showalert={showalert} />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
