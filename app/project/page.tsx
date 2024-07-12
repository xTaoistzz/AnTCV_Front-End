"use client"

import React, { useState } from "react";
import ProjectApp from "../components/project/allproject";
import Create from "../components/project/create";

const Home: React.FC = () => {
  const [showCreate, setCreate] = useState(false);

  const handleCreate = () => {
    setCreate(true);
  }

  const handleCloseCreate = () => {
    setCreate(false);
  }

  return (
    <div className="h-screen m-5 rounded-lg border border-black">
      <div className="p-10">
        <div className="text-center flex justify-between items-center p-5">
          <div className="text-2xl font-bold">Projects</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-600 focus:outline-none"
            onClick={handleCreate}
          >
            + Create Project
          </button>
        </div>
        <div className="border-b border-gray-300 mb-7"></div>
        <div className="space-y-4">
          <ProjectApp />
        </div>
      </div>
      {showCreate && <Create isOpen={showCreate} onClose={handleCloseCreate} />}
    </div>
  );
};

export default Home;