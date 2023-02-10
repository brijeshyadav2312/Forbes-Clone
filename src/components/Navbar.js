import React from 'react'
import { NavLink } from 'react-router-dom'
import '../CSS/Navbaar.css'
const Navbar = () => {
  return (
    <div>
      <div className='navbaar'>
      <NavLink to={'/Home'}><span><span>B</span>ILLIONAIRE<span>S</span></span></NavLink>
      </div>
    </div>
  )
}

export default Navbar
