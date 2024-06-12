"use client";

import React, { useState } from "react";
import Menu from "@/app/components/project/menu/menu";
import { useEffect } from "react";
import Classes from "@/app/components/project/class-props/classes";

interface ProjectProps {
  params: {
    id: string;
  };
}

const ProjectByName: React.FC<ProjectProps> = ({ params }) => {
  const [type, setType] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [ show, setShow ] = useState<string>("")
  const [ menu, setMenu ] = useState(true)


  const toggleMenu = () => {
    setMenu(!menu)
  }
  useEffect(() => {
    const localType = localStorage.getItem("Type");
    const ProjName = localStorage.getItem("Project_Name");
    const Show = localStorage.getItem("Show")
    setType(localType ?? "");
    setProject(ProjName ?? "");
    setShow(Show ?? "");
    // console.log(localType);
    // console.log(ProjName);
    // console.log(show)
  }, []);

  return (
    <div className="">
      <div className="min-h-screen flex m-3 p-3">
        <aside className="flex bg-white border-black p-3">
          {}
          <div className="border-r border-black hover: focus:bg-slate-200 transition duration-200 ease-in-out">
          { menu===true && <Menu/>   }
          </div>
          <button className="rounded-md bg-slate-300 w-12 h-12" onClick={()=>toggleMenu()}>Hide</button>
        </aside>
        <div className="flex-auto bg-white p-3 space-y-2">
          <div className="pl-5 font-bold">Project : {project}</div>
          <div className="border-b border-black pb-4 pl-5">
            Annotation Type : {type}
          </div>
          <div className="pl-5">
            Page Type : {show}
          </div>
          <div className="min-h-screen rounded-md border border-black m-4">
            { show === "Classes" && <Classes params={params}/> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectByName;
