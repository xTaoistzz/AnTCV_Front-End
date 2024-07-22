"use client";

import React from "react";
import Modal from "react-modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Logout Successful</h2>
        <p>You have been logged out successfully.</p>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 bg-orange-400 text-white rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-800"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;