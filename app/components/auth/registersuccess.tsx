import React from "react";
import Modal from "react-modal";

const successMessage = "Register successful!";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function SuccessDialog({ isOpen, onClose }: SuccessDialogProps) {
  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className=" bg-white h-1/2 m-20 text-center border border-black rounded-lg content-center space-y-4"
      >
        <div className="font-extrabold text-5xl">Success</div>
        <div className="font-bold text-xl">{successMessage}</div>
        <div className="space-x-4">
          <button onClick={onClose} className="bg-gray-300 p-2 w-28">
            Close
          </button>
          <button className="bg-gray-300 p-2 w-28">Sign-In</button>
        </div>
      </Modal>
    </div>
  );
}