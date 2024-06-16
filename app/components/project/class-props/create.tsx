import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
const CreateClass = "Create Class successful!";
import Classes from "./classes";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  idproject: string;
}

interface Msg {
  message : string
}

export default function ClassCreate({
  isOpen,
  onClose,
  idproject,
}: SuccessDialogProps) {
  const router = useRouter();
  const [class_label, setName] = useState("");
  const [ msg, setMsg ] = useState<Msg | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const type = localStorage.getItem("Type");
    e.preventDefault();
    try {
      const formData = { class_label, idproject };
      const res = await fetch(`${process.env.ORIGIN_URL}/create/${type}/label`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      setMsg(data)
      window.location.reload()
    } catch (error) {}
  };

  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className=" bg-white h-1/2 m-20 text-center border border-black rounded-lg content-center space-y-4"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="font-extrabold text-l">Enter Class name</div>
          <input
            type="text"
            className="rounded-md border border-black p-2"
            placeholder="Class name"
            onChange={(e) => setName(e.target.value)}
          />
          {
        msg && <div className="font-bold text-l text-green-500">{msg.message}</div>
          }
          <div className="space-x-4">
            <button type="submit" className=" p-2 w-28 rounded-md border border-black hover:bg-slate-100">
              Save
            </button>
            <button
        onClick={onClose}
              className=" p-2 w-28 rounded-md border border-black hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </form>
       
      </Modal>
    </div>
  );
}
