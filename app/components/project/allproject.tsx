import React, { useState, useEffect } from "react";
import { Project, ProjectResponse } from "@/app/types";
import { useRouter } from "next/navigation";

const ProjectApp: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [dropdownState, setDropdownState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.ORIGIN_URL}/allProject`, {
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
  }, []);

  const handleProject = (id: any, name: any) => {
    router.push(`/project/${id}`);
    localStorage.setItem("Project_Name", name);
  };

  const toggleDropdown = (id: number) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const closeDropdown = (id: number) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };

  const handleDeleteProject = async (idproject: number) => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/delete/project`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idproject }),
        credentials: 'include'
      });

      if (res.ok) {
        // Remove the deleted project from state
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.idproject !== idproject)
        );
        console.log(`Project with id ${idproject} deleted successfully.`);
      } else {
        console.error(`Failed to delete project with id ${idproject}.`);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="grid grid-cols-4 space-x-4">
      {projects.map((project) => (
        <div
          key={project.idproject}
          className="grid grid-rows-5 space-y-3 border border-black p-4 rounded-md hover:bg-slate-200 transition duration-200 ease-in-out relative"
        >
          <div
            onClick={() => handleProject(project.idproject, project.project_name)}
            className="row-span-3 border border-black rounded-md justify-center content-center text-center bg-white cursor-pointer"
          >
            Image จ้า
          </div>
          <div className="font-extrabold m-1">{project.project_name}</div>
          <div className="text-gray-800 m-1">{project.description}</div>
          <div className="flex justify-end items-end h-full">
            <button
              onClick={() => toggleDropdown(project.idproject)}
              id={`Option-${project.idproject}`}
              className="object-none border border-black mb-2 p-2 rounded-md bg-white cursor-pointer"
            >
              Option
            </button>
            {dropdownState[project.idproject] && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md border border-gray-300 shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                <button
                  onClick={() => handleDeleteProject(project.idproject)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => closeDropdown(project.idproject)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectApp;