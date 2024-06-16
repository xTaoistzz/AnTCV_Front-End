"use client";
import { useState, useEffect, useCallback } from "react";
import ClassCreate from "./create";

interface ProjectProps {
  params: {
    id: string;
  };
}

interface label {
  class_id: string;
  class_label: string;
}

const Classes: React.FC<ProjectProps> = ({ params }) => {
  const [showCreate, setShowCreate] = useState(false);
  const type = localStorage.getItem("Type");
  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
    fetchClass();
  };

  const [typedata, setTypedata] = useState<label[]>([]);

  const fetchClass = useCallback(async () => {
    try {
      if (type) {
        const res = await fetch(
          `${process.env.ORIGIN_URL}/${type}/class/${params.id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setTypedata(data.label);
        console.log(data.label);
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
    } catch (error) {}
  };

  const RenameClass = async () => {
    document.getElementById("changetoinput");
  };

  return (
    <>
      <div className="flex m-5 justify-between border-b border-black pb-4">
        <div className=" text-l content-center">
          Classes : {typedata.length}
        </div>
        <button
          onClick={() => handleShowCreate()}
          className="border border-black rounded-md p-2"
        >
          Create Class
        </button>
      </div>
      { type === "classification" && <div className="text-center text-red-500 font-bold">=== The Classification is in Maintenance, Cannot Create Class in This type now ===</div>}
      {typedata.map((type, index) => (
        <div key={type.class_id} className="flex pl-6 pr-6 space-x-4">
          <div className=" bg-slate-300 m-2 p-2 rounded-md">{index + 1}</div>
          <div
            id="changetoinput"
            className="flex-1 m-2 p-2 bg-slate-200 rounded-md"
          >
            {type.class_label}
          </div>
          <button
            onClick={() => RenameClass()}
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
      <ClassCreate
        isOpen={showCreate}
        onClose={handleCloseCreate}
        idproject={params.id}
      />
    </>
  );
};

export default Classes;
