"use client";

import React, { useState, useEffect } from "react";
import Menu from "@/app/components/project/menu/menu";
import Classes from "@/app/components/project/class-props/classes";
import Dropzone from "@/app/components/project/upload-props/upload";
import Annotate from "@/app/components/project/annotated-props/annotated";
import Export from "@/app/components/project/export/export";
import Import from "@/app/components/project/import/import";

interface ProjectProps {
  params: {
    id: string;
  };
}

const ProjectByName: React.FC<ProjectProps> = ({ params }) => {
  const [type, setType] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [show, setShow] = useState<string>("");
  const [menu, setMenu] = useState(true);
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const getGallery = () => {
    const gallery = localStorage.getItem("Gallery");
    setActive(gallery === "active");
  };

  useEffect(() => {
    const localType = localStorage.getItem("Type");
    const ProjName = localStorage.getItem("Project_Name");
    const Show = localStorage.getItem("Show");
    setType(localType ?? "");
    setProject(ProjName ?? "");
    setShow(Show ?? "");
    getGallery();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen my-4">
      {/* Sidebar */}
      <aside className={` rounded-r-lg min-h-screen bg-white border border-gray-300 p-4 shadow-md ${menu ? "" : "hidden"}`}>
        {menu && <Menu />}
      </aside>
      
      {/* Toggle Menu Button (Absolute positioning for mobile, relative for desktop) */}
      <div className="absolute md:relative md:top-auto md:right-auto flex items-center">
        <button
          className="rounded-r-lg bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 flex items-center justify-center"
          onClick={toggleMenu}
        >
          {menu ? "<" : ">"}
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-auto bg-white p-4 rounded-lg">
        {/* Project Header */}
        <div className="font-bold text-lg mb-4 text-gray-600">
        {show}
        </div>
        
        {/* Main Content Area */}
        <div className=" min-h-screen md:min-h-0 rounded-md border border-gray-300 p-3 overflow-auto bg-opacity-50">
          {/* Conditional Rendering based on 'show' state */}
          {show === "Classes" && <Classes params={params} />}
          {show === "Upload" && <Dropzone idproject={params.id} />}
          {show === "Annotate" && <Annotate idproject={params.id} />}
          {show === "Export" && <Export idproject={params.id} />}
          {show === "Import" && <Import idproject={params.id}/>}
        </div>
      </div>
    </div>
  );
};

export default ProjectByName;
