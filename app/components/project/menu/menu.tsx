"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const setType = (type: string) => {
    localStorage.setItem("Type", type);
    window.location.reload();
  };

  const setShow = (show: string) => {
    localStorage.setItem("Show", show);
    window.location.reload();
  };

  return (
    <div>
      <ul className="space-y-3 pr-3">
        <li>
          <button  onClick={toggleDropdown} style={{ cursor: "pointer" }} className="rounded-md p-2 hover:bg-slate-200 w-full text-left">
            Annotation Type
            {dropdownVisible && (
              <ul className="grid grid-rows-3 text-left pl-5">
                <li className="pt-3">
                  <button onClick={() => setType("Classification")}>
                    Classification
                  </button>
                </li>
                <li className="pt-3">
                  <button onClick={() => setType("Detection")}>
                    Detection
                  </button>
                </li>
                <li className="pt-3">
                  <button onClick={() => setType("Segmentation")}>
                    Segmentation
                  </button>
                </li>
              </ul>
            )}
          </button>
        </li>
        <li>
          <button onClick={() => setShow("Classes")} className=" rounded-md p-2 hover:bg-slate-200 w-full text-left" >Classes</button>
        </li>
        <li >
          <button onClick={() => setShow("Upload")} className=" rounded-md p-2 hover:bg-slate-200 w-full text-left">Upload</button>
        </li>
        <li >
          <button onClick={() => setShow("Annotate")} className="rounded-md p-2 hover:bg-slate-200 w-full text-left">Annotate</button>
        </li>
        <li >
          <button onClick={() => setShow("Export")} className=" rounded-md p-2 hover:bg-slate-200 w-full text-left">Export</button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
