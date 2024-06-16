"use client"
import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
const successMessage = "Login successful!";

interface CreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function Create({ isOpen, onClose }: CreateDialogProps) {
  const [project_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const formData = { project_name, description }
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/create/project`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials : "include"
      })
      const data = await res.json()
      if (data.type === "success") {
        setMsg(data.message)
        window.location.reload()
      }
    } catch (error) {
      console.error("Error Logging In: ", error);
    }
  };
  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className=" bg-white h-1/2 m-20 text-center border border-black rounded-lg content-center space-y-4"
      >
        <div className="font-extrabold text-xl">Create New Project</div>
        <div className="font-bold text-xl"></div>
        <div className="space-x-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
            <div className="flex flex-col">
              <label htmlFor="project name" className="text-left">Project name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Project name" className="border-2 border-gray-200 rounded-md focus:outline-gray-500 w-full"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-left">Desciption</label>
              <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border-2 border-gray-200 rounded-md focus:outline-gray-500 w-full"/>
            </div>
            {msg && <div className="text-green-500">{msg}</div>}
            <button type="submit" className="text-black border-2 border-black py-2 px-4 rounded hover:bg-gray-300 ">
              Create Project
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
