"use client";

import React, { useState, useEffect } from "react";
import Menu from "@/app/components/project/menu/menu";
import Classes from "@/app/components/project/class-props/classes";
import Dropzone from "@/app/components/project/upload-props/upload";
import Annotate from "@/app/components/project/annotated-props/annotated";

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
    <div className="pb-24 flex flex-col md:flex-row">
      <aside
        className={`bg-white border border-gray-300 p-4 shadow-md ${
          menu ? "" : "hidden"
        }`}
      >
        {menu && <Menu />}
      </aside>
      <div className="absolute top-4 right-4 md:relative md:top-auto md:right-auto flex items-center">
        <button
          className="rounded-r-full bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 flex items-center justify-center"
          onClick={toggleMenu}
        >
          {menu ? "<" : ">"}
        </button>
      </div>
      <div className="flex-auto bg-white p-4">
        <div className="font-bold text-l mb-4 text-gray-600">
          {project} / {show} / {type}
        </div>
        {/* <div className="border-b border-gray-300 pb-2 mb-4">
          Annotation Type: {type}
        </div>
        <div className="mb-4">Page Type: {show}</div> */}
        <div className="min-h-screen md:min-h-0 rounded-md border border-gray-300 p-3 overflow-auto">
          {show === "Classes" && <Classes params={params} />}
          {show === "Upload" && <Dropzone idproject={params.id} />}
          {show === "Annotate" && <Annotate idproject={params.id} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectByName;
