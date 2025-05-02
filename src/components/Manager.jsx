import React, { use, useEffect } from 'react'
import { useRef,useState } from "react"

const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])
    useEffect(() => {
      let passwords = localStorage.getItem("passwords");
      let passwordarray;
      if (passwords) {
        setpasswordarray(JSON.parse(passwords));
      } 
    }
    )
    const showpassword = () => {
       
        // alert("show the password")
        if (ref.current.src.includes( "icons/eye1.svg")) {
            ref.current.src = "icons/eye2.svg";
        }
        else {
            ref.current.src = "icons/eye1.svg";
        }
    }
    const savepassword = () => {
        
    }
    const handlechange=(e) => {
      setform({...form,[e.target.name]:e.target.value})
    }
    
    
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className=" mycontainer">
                <h1 className="text-4xl font-bold text-center"> <span className="text-green-700"> &lt;</span>
                 
                 <span> Pass</span>
                  <span className="text-green-500">OP/&gt;</span></h1>
                <p className="text-lg text-center text-green-500">Your Own Password Manager</p>
                
            <div className="flex flex-col items-center gap-6 p-4 text-black">
                    <input value={form.site} onChange={handlechange} className="w-full p-4 py-1 border border-green-500 rounded-full" type="text" placeholder="Enter Website URL" name="site" />
                <div className="flex justify-between w-full gap-8">
                        <input value={form.username} onChange={handlechange} className="w-full p-4 py-1 border border-green-500 rounded-full" type="text" placeholder="Enter User Name" name="username" />
                        <div className="relative">
                            
                            <input value={form.password} onChange={handlechange} className="w-full p-4 py-1 border border-green-500 rounded-full" type="text" placeholder="Enter Password" name="password"/>
                            <span  onClick={showpassword} className="cursor-pointer absolute top-[4px] right-[3px]"><img ref={ref} className="p-1" width={25} src="icons/eye2.svg" alt="eye" /></span>
                        </div>
            </div>
            <button onClick={savepassword} className="flex justify-center gap-2 px-8 py-2 bg-green-600 border border-green-900 rounded-full gapitems-center w-fit hover:bg-green-500">
            <lord-icon
             src="https://cdn.lordicon.com/jgnvfzqg.json"
             trigger="hover">
                </lord-icon>
                        Add Password</button>
            </div>
            </div>
        </>
  )
    
}

export default Manager
