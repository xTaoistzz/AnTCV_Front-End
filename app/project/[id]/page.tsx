"use client";

import React, { useState, useEffect } from "react";
import Menu from "@/app/components/project/menu/menu";
import Classes from "@/app/components/project/class-props/classes";
import Dropzone from "@/app/components/project/upload-props/upload";
import Annotate from "@/app/components/project/annotated-props/annotated";
import Gallery from "@/app/components/project/annotated-props/gallery";

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
    <div className="pb-24"> {/* Adjust this value based on the height of the fixed footer */}
      <div className="min-h-screen flex m-3 p-3">
        <aside className="flex bg-white border-black p-3">
          <div className="border-r border-black transition duration-200 ease-in-out">
            {menu && <Menu />}
          </div>
          <button
            className="rounded-md bg-slate-300 w-12 h-12"
            onClick={toggleMenu}
          >
            Hide
          </button>
        </aside>
        <div className="flex-auto bg-white p-3 space-y-2">
          <div className="pl-5 font-bold">Project : {project}</div>
          <div className="border-b border-black pb-4 pl-5">
            Annotation Type : {type}
          </div>
          <div className="pl-5">Page Type : {show}</div>
          <div className="min-h-screen rounded-md border border-black m-4">
            {show === "Classes" && <Classes params={params} />}
            {show === "Upload" && <Dropzone idproject={params.id} />}
            {show === "Annotate" && <Annotate />}
          </div>
        </div>
      </div>
      <div className="flex fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-black">
        {active && <Gallery idproject={params.id}/>}
      </div>
    </div>
  );
};

export default ProjectByName;