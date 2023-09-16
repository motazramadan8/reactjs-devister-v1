import React from 'react'
import { Link } from 'react-router-dom'
// Logo
import logo from '../../images/logo png.png'
// Icons
import { RxHamburgerMenu } from 'react-icons/rx'

const HeaderLeft = ({ toggle , setToggle }) => {
  return (
    <div className="header-left">
        <div className="header-logo">
            <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <div onClick={() => setToggle(prev => !prev)} className="header-menu">
            <RxHamburgerMenu className='icon' />
        </div>
    </div>
  )
}

export default HeaderLeft