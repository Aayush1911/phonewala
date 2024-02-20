import Login from "./Component/Login/Login"
import Navbar from "./Component/Navbar/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from "./Component/Signup/Signup"
import Homepage from "./Component/Homepage/Homepage"
import Cart from "./Component/Cart/Cart"
import Description from "./Component/Description/Description"

function App() {

  return (
    <><Router>
      <Navbar />
        <Routes>
          <Route path='/login' element={<Login/>} />
        </Routes>
        <Routes>
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Routes>
          <Route path='/cart' element={<Cart/>} />
        </Routes>
        <Routes>
          <Route path='/description/:id' element={<Description/>} />
        </Routes>
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
