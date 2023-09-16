import React, { useState } from 'react'
// Component
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
import NavBar from './NavBar'
// Css File
import './header.css'


const Header = () => {
  const [toggle, setToggle] =  useState(false);
  return (
    <header className="header">
        <HeaderLeft setToggle={setToggle} toggle={toggle} />
        <NavBar setToggle={setToggle} toggle={toggle} /> 
        <HeaderRight />
    </header>
  )
}

export default Header