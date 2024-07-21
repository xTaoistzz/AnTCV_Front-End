import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";

interface CreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Create({ isOpen, onClose }: CreateDialogProps) {
  const [project_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if either project_name or description is empty
    if (!project_name.trim() || !description.trim()) {
      setMsg("Please fill out both fields.");
      return;
    }

    const formData = { project_name, description };
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/create/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.type === "success") {
        setMsg(data.message);
        router.push("/project"); // Redirect to the project page after successful creation
        onClose(); // Close the modal
        window.location.reload();
      }
    } catch (error) {
      console.error("Error Logging In: ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center h-screen"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative transition-opacity ease-out duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-opacity ease-out duration-300"
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 text-center">Create New Project</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="project_name" className="text-left mb-1">
              Name
            </label>
            <input
              id="project_name"
              type="text"
              placeholder="Enter Project Name"
              value={project_name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-left mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 w-full"
            />
          </div>
          {msg && <div className="text-red-500 text-center">{msg}</div>}
          <button
            type="submit"
            className="border border-slate-700 bg-white text-gray-800 hover:bg-orange-400 transition-colors duration-300 hover:text-white font-medium  rounded-lg p-2"
          >
            Create Project
          </button>
        </form>
      </div>
    </Modal>
  );
}