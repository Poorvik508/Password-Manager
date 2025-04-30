import React from 'react'

const Navbar = () => {
  return (
      <nav className="flex items-center justify-between px-4 bg-purple-200 h-14">
          <div className="font-bold ">Passop</div>
          <ul >
              <li className="flex gap-4 ">
                  <a className="hover:font-bold" href="/">Home</a>
                  <a className="hover:font-bold" href="#">About</a>
                  <a className="hover:font-bold" href="#">Contact</a>
              
              </li>
          </ul>
   </nav>
  )
}

export default Navbar
