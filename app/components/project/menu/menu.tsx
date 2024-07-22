import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [type, setType] = useState<string>('')
  const [name,setName] = useState<string>('')
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const setAnno = (type: string) => {
    localStorage.setItem("Type", type);
    window.location.reload();
  };

  const setShow = (show: string) => {
    localStorage.setItem("Show", show);
    if (show === "Annotate") {
      localStorage.setItem("Gallery", "active");
    } else {
      localStorage.setItem("Gallery", "inactive");
    }
    window.location.reload();
  };

  useEffect(()=>{
    const type = localStorage.getItem("Type") || ''
    const name = localStorage.getItem("Project_Name") || ''
    setType(type)
    setName(name)
  })
  return (
    <div className="bg-white rounded-lg">
      <ul className="space-y-3">
        <li>
          <div className="bg-black h-28 rounded-lg"></div>
          <div className="text-reght text-gray-500">{name}</div>
          <div className="text-right text-gray-500">Type: {type}</div>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full rounded-md p-2 hover:bg-gray-100 text-left focus:outline-none"
          >
            
            <span>Edit Type</span>
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
        <li>
          <button
            onClick={() => setShow("Export")}
            className="rounded-md p-2 hover:bg-gray-100 w-full text-left focus:outline-none"
          >
            Export
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;