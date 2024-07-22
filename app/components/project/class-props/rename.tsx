"use client";

import React, { useState, FormEvent } from "react";

interface ClassRenameProps {
  isOpen: boolean;
  onClose: () => void;
  idproject: string;
  class_id: string;
  currentLabel: string;
  onRename: (idproject: string, class_id: string, newLabel: string) => void;
}

const ClassRename: React.FC<ClassRenameProps> = ({
  isOpen,
  onClose,
  idproject,
  class_id,
  currentLabel,
  onRename
}) => {
  const [newLabel, setNewLabel] = useState(currentLabel);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onRename(idproject, class_id, newLabel); // Pass idproject and class_id along with newLabel
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Rename Class</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Label
            </label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-400 text-white hover:bg-orange-500 rounded-md px-4 py-2"
            >
              Rename
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassRename;