import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom'

const Navbr = () => {
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // navigate('/login');
  }
  const loadCart = () => {
    setCartView(true)
  }
  const items = useCart();

  return (
    <div className='fs-5'>

      <Navbar bg="success" data-bs-theme="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ color: "white" }}>Home</Nav.Link>
            {(localStorage.getItem("authToken")) ?
              <Link to="/myorder" style={{ color: "white", textDecoration: "none", margin: "8px" }}>MyOrders </Link>
              : ""
            }

          </Nav>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to='/login'>Login</Link>
              <Link className="btn bg-white text-success mx-1" to='/createuser'>SignUp</Link>
            </div>
            :
            <div className='d-flex'>
              <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                <Badge color="secondary" badgeContent={items.length} >
                  <ShoppingCartIcon className='m-a'/>  
                </Badge>
                  <span className='mx-3 bold'>Cart</span>
              </div>

              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

              <div className='d-flex'>
                <Link className="btn bg-white text-danger mx-1" to='/login' onClick={handleLogout}>Logout</Link>

              </div>

            </div>


          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbr;