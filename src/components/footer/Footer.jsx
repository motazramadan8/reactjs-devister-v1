import React from 'react'
import "./footer.css"

const Footer = () => {
  const years = new Date().getFullYear()

  return (
    <footer>
        Copyright {years} &copy;
        <a 
         target='_blank' 
         rel="noreferrer" 
         href="https://motaz.vercel.app"
        >
          <strong className="copyright-link">Motaz Ramadan</strong>
        </a>
    </footer>
  )
}


export default Footer