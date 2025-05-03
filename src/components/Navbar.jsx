import React from 'react'

const Navbar = () => {
  return (
      <nav className="text-white bg-slate-800">
          <div className="flex items-center justify-between px-4 py-5 mycontainer h-14">
              
              <div className="text-2xl font-bold text-white">
                  <span className="text-green-500"> &lt;</span>
                 
                 <span> Pass</span>
                  <span className="text-green-500">OP/&gt;</span>
                 
              </div>
          <ul >
              <li className="flex gap-4 ">
                  <a className="hover:font-bold" href="/">Home</a>
                  <a className="hover:font-bold" href="#">About</a>
                  <a className="hover:font-bold" href="#">Contact</a>
              
              </li>
              </ul>
              
              
        </div>
   </nav>
  )
}

export default Navbar
