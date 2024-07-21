import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  idproject: string;
}

interface Msg {
  message: string;
}

export default function ClassCreate({ isOpen, onClose, idproject }: SuccessDialogProps) {
  const [classLabel, setClassLabel] = useState("");
  const [msg, setMsg] = useState<Msg | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const type = localStorage.getItem("Type");

    if (!classLabel.trim()) {
      setMsg({ message: "Please enter a class name." });
      return;
    }

    try {
      const formData = { class_label: classLabel, idproject };
      const res = await fetch(`${process.env.ORIGIN_URL}/create/${type}/label`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      setMsg(data);
      if (data.type === "success") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating class: ", error);
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
        <h2 className="text-2xl font-extrabold mb-4 text-center">Enter Class Name</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Class name"
              value={classLabel}
              onChange={(e) => setClassLabel(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-500 w-full"
            />
          </div>
          {msg && <div className="text-green-500 text-center">{msg.message}</div>}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}