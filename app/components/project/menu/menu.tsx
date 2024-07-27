import React, { useState, useEffect } from "react";
import { HiMiniPhoto } from "react-icons/hi2"; // Import the icon

interface MenuProps {
  idproject: string;
}

const Menu: React.FC<MenuProps> = ({ idproject }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [type, setType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [first, setFirst] = useState<string>("");

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const setAnno = (type: string) => {
    localStorage.setItem("Type", type);
    window.location.reload();
  };

  const setShow = (show: string ) => {
    localStorage.setItem("Show",show)
    if (show === "Annotate") {
      localStorage.setItem("Gallery", "active");
    } else {
      localStorage.setItem("Gallery", "inactive");
    }
    window.location.reload();
  };

  const firstImg = async () => {
    try {
      const response = await fetch(`${process.env.ORIGIN_URL}/getImg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idproject }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const img = await response.json();
      setFirst(img.imgName);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    const type = localStorage.getItem("Type") || "";
    const name = localStorage.getItem("Project_Name") || "";
    firstImg();
    setType(type);
    setName(name);
  });

  return (
    <div className="bg-white rounded-lg">
      <ul className="space-y-3">
        <li>
          <div className="">
            {first ? (
              <img
                src={`${process.env.ORIGIN_URL}/img/${idproject}/thumbs/${first}`}
                width={150}
                height={150}
                className="rounded-lg shadow-lg h-auto object-cover cursor-pointer border-2"
              />
            ) : (
              <div className="flex items-center justify-center w-[150px] h-[150px] rounded-lg shadow-lg border-2">
                <HiMiniPhoto className="text-gray-500" size={50} /> {/* Larger icon */}
              </div>
            )}
          </div>
        </li>
        <li className="space-y-2">
          <div className="text-right text-gray-500">{name}</div>
          <div className="text-right text-gray-500 capitalize">{type}</div>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full rounded-md p-2 hover:bg-gray-100 text-left focus:outline-none"
          >
            <span className="font-normal text-gray-700">Change Type</span>
            <span className="ml-2">
              {dropdownVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.707 9.293a1 1 0 0 1 1.414 0L10 11.586l1.879-1.879a1 1 0 1 1 1.414 1.414l-2.5 2.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </button>
          {dropdownVisible && (
            <ul className="pl-5 mt-2">
              <li className="pt-2">
                <button
                  onClick={() => setAnno("classification")}
                  className="text-gray-800 hover:text-blue-500 focus:outline-none"
                >
                  Classification
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setAnno("detection")}
                  className="text-gray-800 hover:text-blue-500 focus:outline-none"
                >
                  Detection
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setAnno("segmentation")}
                  className="text-gray-800 hover:text-blue-500 focus:outline-none"
                >
                  Segmentation
                </button>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => setShow("Classes")}
            className="rounded-md p-2 hover:bg-gray-100 w-full text-left focus:outline-none"
          >
            Classes
          </button>
        </li>
        {type !== "classification" && (
          <div>
            <li>
              <button
                onClick={() => setShow("Upload")}
                className="rounded-md p-2 hover:bg-gray-100 w-full text-left focus:outline-none"
              >
                Upload
              </button>
            </li>
            <li>
              <button
                onClick={() => setShow("Annotate")}
                className="rounded-md p-2 hover:bg-gray-100 w-full text-left focus:outline-none"
              >
                Annotate
              </button>
            </li>
          </div>
        )}
        <li>
          <button
            onClick={() => setShow("Export")}
            className="rounded-md p-2 hover:bg-gray-100 w-full text-left focus:outline-none"
          >
            Export
          </button>
        </li>
        <li>
          <button
            onClick={() => setShow("Import")}
            className="rounded-md p-2 hover:bg-gray-100 w-full text-left focus:outline-none"
          >
            Import
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;