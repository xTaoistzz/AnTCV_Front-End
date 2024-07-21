"use client";

import React, { useEffect, useState } from "react";
import ProjectApp from "../components/project/allproject";
import Create from "../components/project/create";

const Home: React.FC = () => {
  const [showCreate, setCreate] = useState(false);
  const [owner, setOwner] = useState('');

  const fetchOwner = async () => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/returnUsername`, { credentials: 'include' });
      const data = await res.json(); // Assuming the response is JSON
      setOwner(data.username); // Adjust this based on the actual structure of your response
    } catch (error) {
      console.error('Error fetching owner:', error);
    }
  };

  useEffect(() => {
    fetchOwner();
  }, []);

  const handleCreate = () => {
    setCreate(true);
  };

  const handleCloseCreate = () => {
    setCreate(false);
  };

  return (
    <div className="h-screen m-5 rounded-lg border border-white bg-white bg-opacity-70">
      <div className="p-10">
        <div className="text-center flex justify-between items-center p-5">
          <div className="text-2xl">Welcome back to Workspace, {owner}!</div>
          <div className="space-x-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-600 focus:outline-none"
              onClick={handleCreate}
            >
              Import Dataset
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-600 focus:outline-none"
              onClick={handleCreate}
            >
              + Create Project
            </button>
          </div>
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