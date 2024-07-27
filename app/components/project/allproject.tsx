import React, { useState, useEffect } from "react";
import { Project, ProjectResponse } from "@/app/types";
import { useRouter } from "next/navigation";
import { AiFillSetting } from "react-icons/ai";
import { HiMiniPhoto } from "react-icons/hi2";

const ProjectApp: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [dropdownState, setDropdownState] = useState<{ [key: number]: boolean }>({});
  const [firstImgMap, setFirstImgMap] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.ORIGIN_URL}/allProject`, {
          credentials: "include",
        });
        const data: ProjectResponse = await res.json();
        setProjects(data.project);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchFirstImages = async () => {
      const imgMap: { [key: number]: string } = {};
      for (const project of projects) {
        try {
          const response = await fetch(`${process.env.ORIGIN_URL}/getImg`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idproject: project.idproject }),
            credentials: "include",
          });

          if (response.ok) {
            const img = await response.json();
            imgMap[project.idproject] = img.imgName; // Assuming the response contains the image name as imgName
          }
        } catch (error) {
          console.error(`Error fetching image for project ${project.idproject}:`, error);
        }
      }
      setFirstImgMap(imgMap);
    };

    if (projects.length > 0) {
      fetchFirstImages();
    }
  }, [projects]);

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

  const closeDropdown = (id: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation(); // Prevents click from propagating to parent div
    setDropdownState((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };

  const handleDeleteProject = async (idproject: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation(); // Prevents click from propagating to parent div
    
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
        window.location.reload();
      } else {
        console.error(`Failed to delete project with id ${idproject}.`);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation(); // Prevents click from propagating to parent div
    toggleDropdown(id); // Toggles dropdown state
  };

  return (
    <div className="grid grid-cols-4 space-x-4">
      {projects.map((project) => (
        <div
          key={project.idproject}
          onClick={() => handleProject(project.idproject, project.project_name)}
          className="grid grid-rows-5 space-y-3 border p-4 rounded-md hover:bg-opacity-30 hover:bg-gradient-to-r from-orange-300 bg-orange-200 transition-colors duration-300 ease-in-out relative shadow-lg"
        >
          <div
            className="row-span-3 border rounded-md flex justify-center items-center bg-white cursor-pointer"
          >
            {firstImgMap[project.idproject] ? (
              <img
                src={`${process.env.ORIGIN_URL}/img/${project.idproject}/thumbs/${firstImgMap[project.idproject]}`}
                alt="First Image"
                className="rounded-lg shadow-lg h-auto object-cover blur-sm hover:blur-none transition-all"
              />
            ) : (
              <HiMiniPhoto className="text-8xl text-gray-400" />
            )}
          </div>
          <div className="font-extrabold m-1">{project.project_name}</div>
          <div className="text-gray-800 m-1">{project.description}</div>
          <div className="flex justify-end items-end h-full">
            <button
              onClick={(e) => handleOptionClick(e, project.idproject)}
              id={`Option-${project.idproject}`}
              className="object-none border mb-2 p-2 rounded-md bg-white cursor-pointer hover:bg-gray-900 text-xl hover:text-white"
            >
              <AiFillSetting />
            </button>
            {dropdownState[project.idproject] && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md border border-gray-300 shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                <button
                  onClick={(e) => handleDeleteProject(project.idproject, e)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => closeDropdown(project.idproject, e)}
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