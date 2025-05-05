import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setpasswordarray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordarray(passwords);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const savepassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const newPassword = { ...form, id: form.id || uuidv4() };

      if (form.id) {
        await fetch("http://localhost:3000", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      if (response.ok) {
        setpasswordarray([...passwordarray, newPassword]);
        setform({ site: "", username: "", password: "" });
        toast("Password Saved Successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast("Failed to save password", { theme: "dark" });
      }
    } else {
      toast("Length Of Input Is Less Than 3", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    }
  };

  const deletepassword = async (id) => {
    setpasswordarray(passwordarray.filter((item) => item.id !== id));
    if (id) {
      await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
    toast("Password Deleted Successfully", {
      position: "top-right",
      autoClose: 1000,
      theme: "light",
    });
  };

  const editpassword = (id) => {
    const itemToEdit = passwordarray.find((item) => item.id === id);
    setform({ ...itemToEdit });
    setpasswordarray(passwordarray.filter((item) => item.id !== id));
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savetext = (item) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 1000,
      theme: "light",
    });
    navigator.clipboard.writeText(item);
  };

  return (
    <>
      <ToastContainer />
      <div className="px-4 py-6 max-w-screen-md mx-auto">
        {/* Form Section */}
        <h1 className="text-4xl font-bold text-center mb-2">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-lg text-center text-green-500 mb-4">
          Your Own Password Manager
        </p>

        <div className="flex flex-col items-center gap-4 text-black">
          <input
            value={form.site}
            onChange={handlechange}
            className="w-full p-2 border border-green-500 rounded-full"
            type="text"
            placeholder="Enter Website URL"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-4">
            <input
              value={form.username}
              onChange={handlechange}
              className="w-full p-2 border border-green-500 rounded-full"
              type="text"
              placeholder="Enter User Name"
              name="username"
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handlechange}
                className="w-full p-2 border border-green-500 rounded-full"
                type="password"
                placeholder="Enter Password"
                name="password"
              />
            </div>
          </div>
          <button
            onClick={savepassword}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white border border-green-900 rounded-full hover:bg-green-500 transition"
          >
            Save
          </button>
        </div>

        {/* Password Table Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Passwords</h2>
          {passwordarray.length === 0 ? (
            <p>No Passwords To Show</p>
          ) : (
            <div className="overflow-y-auto max-h-[300px] w-full border border-green-300 rounded-md">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-green-800 text-white sticky top-0 z-10">
                  <tr>
                    <th className="py-2 px-2 text-left">Site</th>
                    <th className="py-2 px-2 text-left">Username</th>
                    <th className="py-2 px-2 text-left">Password</th>
                    <th className="py-2 px-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordarray.map((item, index) => (
                    <tr key={index} className="border-b border-green-300">
                      <td className="px-2 py-2 max-w-[120px] truncate">
                        <div className="flex items-center gap-2">
                          <span className="truncate w-32">{item.site}</span>
                          <img
                            onClick={() => savetext(item.site)}
                            className="cursor-pointer"
                            width={18}
                            src="icons/copy.svg"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2 max-w-[120px] truncate">
                        <div className="flex items-center gap-2">
                          <span className="truncate w-32">{item.username}</span>
                          <img
                            onClick={() => savetext(item.username)}
                            className="cursor-pointer"
                            width={18}
                            src="icons/copy.svg"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2 max-w-[120px] truncate">
                        <div className="flex items-center gap-2">
                          <span className="truncate w-32">
                            {"*".repeat(item.password.length)}
                          </span>
                          <img
                            onClick={() => savetext(item.password)}
                            className="cursor-pointer"
                            width={18}
                            src="icons/copy.svg"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-4">
                          <FaEdit
                            onClick={() => editpassword(item.id)}
                            className="cursor-pointer text-blue-700"
                          />
                          <MdDeleteForever
                            onClick={() => deletepassword(item.id)}
                            className="cursor-pointer text-red-600"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
