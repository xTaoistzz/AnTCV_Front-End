"use client";

import React, { useState, useCallback, useEffect } from "react";
import ClassCreate from "./create";
import ClassRename from "./rename";

interface ProjectProps {
  params: {
    id: string;
  };
}

interface Label {
  class_id: string;
  class_label: string;
}

const Classes: React.FC<ProjectProps> = ({ params }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [renameClassId, setRenameClassId] = useState<string | null>(null); // To store the class_id for renaming
  const [typedata, setTypedata] = useState<Label[]>([]);
  const type = localStorage.getItem("Type");

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
    fetchClass();
  };

  const handleShowRename = (class_id: string) => {
    setRenameClassId(class_id);
    setShowRename(true);
  };

  const handleCloseRename = () => {
    setRenameClassId(null);
    setShowRename(false);
    fetchClass();
  };

  const fetchClass = useCallback(async () => {
    try {
      if (type) {
        const res = await fetch(
          `${process.env.ORIGIN_URL}/${type}/class/${params.id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setTypedata(data.label);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }, [params.id, type]);

  useEffect(() => {
    fetchClass();
  }, [fetchClass]);

  const DeleteClass = async (class_id: string) => {
    try {
      const res = await fetch(
        `${process.env.ORIGIN_URL}/delete/${type}/class/${class_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = res.json();
      fetchClass();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const RenameClass = async (idproject: string, class_id: string, newLabel: string) => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/update/${type}/class`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idproject, class_id, class_label: newLabel }),
        credentials: "include",
      });
      if (res.ok) {
        handleCloseRename();
      } else {
        console.error("Error renaming class");
      }
    } catch (error) {
      console.error("Error renaming class:", error);
    }
  };

  return (
    <>
      <div className="flex m-5 justify-between border-b border-slate-400 pb-4">
        <div className="text-l content-center">
          Classes: {typedata.length}
        </div>
        <button
          onClick={handleShowCreate}
          className="border border-slate-400 bg-white text-gray-800 hover:bg-orange-400 transition-colors duration-300 hover:text-white font-normal rounded-lg p-2"
        >
          Create Class
        </button>
      </div>
      {type === "classification" && (
        <div className="text-center text-red-400 font-normal">
          === The Classification is in Maintenance, Cannot Create Class in This
          type now ===
        </div>
      )}
      {typedata.map((type, index) => (
        <div key={type.class_id} className="flex pl-6 pr-6 space-x-4">
          <div className="border m-2 p-2 rounded-full w-10 h-10 text-center">
            {index + 1}
          </div>
          <div className="flex-1 m-2 p-2 bg-white rounded-md">
            {type.class_label}
          </div>
          <button
            onClick={() => handleShowRename(type.class_id)}
            className="m-2 p-2 bg-yellow-500 rounded-md text-white hover:bg-green-700"
          >
            Rename
          </button>
          <button
            className="m-2 p-2 bg-red-500 rounded-md text-white hover:bg-red-700"
            onClick={() => DeleteClass(type.class_id)}
          >
            Delete
          </button>
        </div>
      ))}
      {renameClassId && (
        <ClassRename
          isOpen={showRename}
          onClose={handleCloseRename}
          idproject={params.id}
          class_id={renameClassId}
          currentLabel={typedata.find(label => label.class_id === renameClassId)?.class_label || ""}
          onRename={RenameClass}
        />
      )}
      <ClassCreate
        isOpen={showCreate}
        onClose={handleCloseCreate}
        idproject={params.id}
      />
    </>
  );
};

export default Classes;