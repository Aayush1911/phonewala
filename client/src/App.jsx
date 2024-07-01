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
import VerifyOTP from "./Component/Otpverify/VerifyOTP"

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  return (
    <Router>
      <Navbar showalert={showAlert} />
      <Alert alert={alert}/>
      <Routes>
        <Route path='/login' element={<Login showalert={showAlert} />} />
        <Route path='/signup' element={<Signup showalert={showAlert} />} />
        <Route path='/verify' element={<VerifyOTP showalert={showAlert} />} />
        <Route path='/cart' element={<Cart showalert={showAlert} />} />
        <Route path='/description/:id' element={<Description showalert={showAlert} />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/mobile/:category' element={<Homepage showalert={showAlert} />} />
        <Route path='/' element={<Homepage showalert={showAlert} />} />
      </Routes>
    </Router>
  )
}

export default App
