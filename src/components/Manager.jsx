import React, { use, useEffect } from 'react'
import { useRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4}  from 'uuid'



const Manager = () => {
  const ref = useRef()
  const passwordref=useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])
    useEffect(() => {
      let passwords = localStorage.getItem("passwords");
      let passwordarray;
      if (passwords) {
        setpasswordarray(JSON.parse(passwords));
      } 
    },[]
    )
    // const showpassword = () => {
    //    passwordref.current="text"
    //     // alert("show the password")
    //     if (ref.current.src.includes( "icons/eye1.svg")) {
    //         ref.current.src = "icons/eye2.svg";
    //     }
    //     else {
    //         ref.current.src = "icons/eye1.svg";
    //     }
    // }
    const savepassword = () => {
      setpasswordarray([...passwordarray, { ...form,id:uuidv4() }])
      localStorage.setItem(
        "password",
        JSON.stringify([...passwordarray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" })
       toast("Password Saved Successfully", {
         position: "top-right",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
      
    }
    const deletepassword = (id) => {
      setpasswordarray(passwordarray.filter(item=>item.id!=id))
      localStorage.setItem(
        "password", JSON.stringify(passwordarray.filter(item=>item.id!=id) )
      );
       toast("Password Deleted Successfully", {
         position: "top-right",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
      
  }
  const editpassword = (id) => {
    setform(passwordarray.filter(item => item.id === id)[0])
    setpasswordarray(passwordarray.filter(item=>item.id!=id))
    
  }
    const handlechange=(e) => {
      setform({...form,[e.target.name]:e.target.value})
  }
  const savetext = ((item) => {
    toast("Copy To ClipBoard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress:undefined,
      theme: "light",
    
    });

    navigator.clipboard.writeText(item)
  })
    
    
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        
        />
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="p-2 md:p-0 md:mycontainer">
          <h1 className="text-4xl font-bold text-center">
            {" "}
            <span className="text-green-700"> &lt;</span>
            <span> Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </h1>
          <p className="text-lg text-center text-green-500">
            Your Own Password Manager
          </p>

          <div className="flex flex-col items-center gap-6 p-4 text-black">
            <input
              value={form.site}
              onChange={handlechange}
              className="w-full p-4 py-1 border border-green-500 rounded-full"
              type="text"
              placeholder="Enter Website URL"
              name="site"
            />
            <div className="flex md:flex-row flex-col justify-between w-full gap-8">
              <input
                value={form.username}
                onChange={handlechange}
                className="w-full p-4 py-1 border border-green-500 rounded-full"
                type="text"
                placeholder="Enter User Name"
                name="username"
              />
              <div className="relative">
                <input
                  ref={passwordref}
                  value={form.password}
                  onChange={handlechange}
                  className="w-full p-4 py-1 border border-green-500 rounded-full"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                />
                {/* <span
                  onClick={showpassword}
                  className="cursor-pointer absolute top-[4px] right-[3px]"
                >
                  <img
                    ref={ref}
                    className="p-1"
                    width={25}
                    src="icons/eye2.svg"
                    alt="eye"
                  />
                </span> */}
              </div>
            </div>
            <button
              onClick={savepassword}
              className="flex justify-center gap-2 px-8 py-2 bg-green-600 border border-green-900 rounded-full gapitems-center w-fit hover:bg-green-500"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Add Password
            </button>
          </div>
          <div className="passwords">
            <h2 className="font-bold text-2xl  py-4">Your Passwords</h2>
            {passwordarray.length === 0 && <div>No Passwords To Show</div>}
            {passwordarray.length !== 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden">
                <thead className="text-white bg-green-800 ">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">User Name</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordarray.map((item, index) => {
                    return (
                      <tr key={index} className="py-2">
                        <td className="  w-32  ">
                          <div className="flex items-center px-2">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="cursor-pointer mx-2"
                              onClick={() => savetext(item.site)}
                            >
                              <img width={20} src="icons/copy.svg" alt="" />
                            </div>
                          </div>
                        </td>
                        <td className=" w-32 px-2">
                          <div className="flex w-32 items-center justify-center">
                            {item.username}
                            <div
                              className="  cursor-pointer mx-2"
                              onClick={() => savetext(item.username)}
                            >
                              <img width={20} src="icons/copy.svg" alt="" />
                            </div>
                          </div>
                        </td>
                        <td className="  px-2 w-32">
                          <div className="flex items-center justify-center">
                            {item.password}
                            <div
                              className="cursor-pointer mx-2"
                              onClick={() => savetext(item.password)}
                            >
                              <img width={20} src="icons/copy.svg" alt="" />
                            </div>
                          </div>
                        </td>
                        <td className=" px-2 w-32">
                          <div className="flex justify-center items-center gap-10">

                          <span onClick={()=>editpassword(item.id)} className="cursor-pointer">  < FaEdit/> </span>
                          <span onClick={()=>deletepassword(item.id)} className="cursor-pointer ">  <MdDeleteForever /> </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
    
}

export default Manager
