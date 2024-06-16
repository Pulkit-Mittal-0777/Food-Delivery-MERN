import React from 'react'
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/ContextReducer';


const App = () => {
  return (
    <CartProvider>
      <Router>
      <div>
        <Routes>

          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/createuser' element={<Signup/>} />
          <Route path="/myorder" element={<MyOrder />} />
          
        </Routes>
      </div>
    </Router>
    </CartProvider>
    
  )
}

export default App