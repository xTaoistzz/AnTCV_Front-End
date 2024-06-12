"use client";

import React, { useState, useEffect } from "react";
import { Project, ProjectResponse } from "@/app/types";
import { useRouter } from "next/navigation";

const ProjectApp: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [id, setId] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/allProject", {
          credentials: "include",
        });
        const data: ProjectResponse = await res.json();
        setProjects(data.project);
        console.log(data.project);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []); // ใช้ useEffect ที่มี dependency เป็น array ว่าง เพื่อให้ทำงานครั้งเดียวตอน component mount

  const handleProject = (id: any, name:any) => {
    router.push(`/project/${id}`);
    localStorage.setItem("Project_Name", name)
  };

  const change = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    const button = event?.currentTarget;
    button.innerHTML = 'Hi'
  }

  return (
    <div className="grid grid-cols-4 space-x-4">
      {projects.map((project) => (
        <div
          onClick={() => handleProject(project.idproject, project.project_name)}
          key={project.idproject}
          className="grid grid-rows-5 space-y-3 border border-black p-4 rounded-md hover:bg-slate-200 transition duration-200 ease-in-out"
        >
          <div className=" row-span-3 border border-black rounded-md justify-center content-center text-center bg-white">
            Image จ้า
          </div>
          <div className=" font-extrabold m-1">{project.project_name}</div>
          <div className=" text-gray-800 m-1">{project.description}</div>
          <div className="flex justify-end items-end h-full">
            <button onClick={change} id="Option" className="object-none border border-black mb-2 p-2 rounded-md bg-white">Option</button>
          </div>
        </div>
        
      ))}
    </div>
  );
};

export default ProjectApp;
