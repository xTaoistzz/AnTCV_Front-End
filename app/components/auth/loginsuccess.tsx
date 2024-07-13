import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";

const successMessage = "Login successful!";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessDialog({
  isOpen,
  onClose,
}: SuccessDialogProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push("/project");
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
        <div className="font-extrabold text-5xl text-center mb-4">Success</div>
        <div className="font-bold text-xl text-center mb-4">{successMessage}</div>
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-200 py-2 px-6 rounded-md mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}