import React from 'react'

const Manager = () => {
    return (
        <>
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className=" mycontainer bg-slate-50">
                <h1 className="text-4xl font-bold text-center"> <span className="text-green-700"> &lt;</span>
                 
                 <span> Pass</span>
                  <span className="text-green-700">OP/&gt;</span></h1>
                <p className="text-lg text-center text-green-700">Your Own Password Manager</p>
                
            <div className="flex flex-col gap-6 p-4 text-black">
                    <input className="w-full p-4 py-1 border border-green-500 rounded-full" type="text" />
                <div className="flex justify-between w-full gap-8">
                  <input className="w-full p-4 py-1 border border-green-500 rounded-full" type="text" />
                  <input className="w-full p-4 py-1 border border-green-500 rounded-full" type="text" />
                </div>
                    <button>Add Password</button>
            </div>
            </div>
        </>
  )
    
}

export default Manager
