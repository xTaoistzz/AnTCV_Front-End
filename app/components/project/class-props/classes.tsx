import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ClassCreate from "./create";
import ClassRename from "./rename";
import Image from "next/image";

interface ProjectProps {
  params: {
    id: string;
  };
}

interface Label {
  class_id: string;
  class_label: string;
  class_index: string;
}

const Classes: React.FC<ProjectProps> = ({ params }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [renameClassId, setRenameClassId] = useState<string | null>(null);
  const [typedata, setTypedata] = useState<Label[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dropzoneVisibility, setDropzoneVisibility] = useState<{ [key: string]: boolean }>({});

  const type = localStorage.getItem("Type");

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
    fetchClass();
  };

  const handleShowRename = (class_id: string) => {
    setRenameClassId(class_id);
    setShowRename(true);
  };

  const handleCloseRename = () => {
    setRenameClassId(null);
    setShowRename(false);
    fetchClass();
  };

  const fetchClass = useCallback(async () => {
    try {
      if (type) {
        const res = await fetch(
          `${process.env.ORIGIN_URL}/${type}/class/${params.id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        const renamedData = {
          ...data,
          label: data.getAllClass ?? []
        };
        if (type === 'classification') {
          setTypedata(renamedData.strClass ?? []);
        } else {
          setTypedata(renamedData.label ?? []);
        }
        console.log(renamedData);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }, [params.id, type]);

  useEffect(() => {
    fetchClass();
  }, [fetchClass]);

  const DeleteClass = async (class_id: string) => {
    try {
      const res = await fetch(
        `${process.env.ORIGIN_URL}/delete/${type}/class/${class_id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      fetchClass();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const RenameClass = async (idproject: string, class_id: string, newLabel: string) => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/update/${type}/class`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idproject, class_id, class_label: newLabel }),
        credentials: "include",
      });
      if (res.ok) {
        handleCloseRename();
      } else {
        console.error("Error renaming class");
      }
    } catch (error) {
      console.error("Error renaming class:", error);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const uploadFile = async () => {
    // if (!selectedClassId || selectedFiles.length === 0) {
    //   console.error("No class selected or no files to upload");
    //   return;
    // }

    const selectedClass = typedata.find(type => type.class_index === selectedClassId);
    const classIndex = selectedClass ? selectedClass.class_index : 0;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("idproject", params.id);
    formData.append("index", classIndex.toString());

    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/classification/uploadImage`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });
      if (res.ok) {
        console.log("Upload successful");
        setSelectedFiles([]);
        setSuccessMessage("Images uploaded successfully!");
        fetchClass();
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const removeFile = (file: File) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const imagesPerPage = 12;
  const totalPages = Math.ceil(selectedFiles.length / imagesPerPage);

  const getCurrentPageFiles = () => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return selectedFiles.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const toggleDropzone = (class_index:string) => {
    if (selectedClassId===class_index) {
      setDropzoneVisibility((prevVisibility) => ({
        ...prevVisibility,
        [class_index]: !prevVisibility[class_index]
      }));
    } else {
      setDropzoneVisibility((prevVisibility) => ({
        ...prevVisibility,
        [class_index]: prevVisibility[class_index]
      }));
    }
    
  };


  const selectIndex = (class_index:string) => {
    setSelectedClassId(class_index)
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="flex m-5 justify-between border-b border-slate-400 pb-4">
        <div className="text-l content-center">
          There are {typedata.length} classes
        </div>
        <button
          onClick={handleShowCreate}
          className="border border-slate-400 bg-white text-gray-800 hover:bg-orange-400 transition-colors duration-300 hover:text-white font-normal rounded-lg p-2"
        >
          Create Class
        </button>
      </div>
      {type === "classification" && typedata.map((type, index) => (
        <div key={type.class_index} className="mb-4">
          <div onClick={()=>selectIndex(type.class_index)} className={`flex pl-6 pr-6 space-x-4 hover:bg-orange-300 w-full text-left bg-opacity-50 rounded-2xl transition-colors ${selectedClassId === type.class_index ? "bg-orange-200" : ""}`}>
            <div className="border m-2 p-2 rounded-full w-10 h-10 text-center bg-white">
              {index + 1}
            </div>
            <div className="m-2 p-2 flex-grow">
              {type.class_label}
            </div>
            <button
              onClick={() => toggleDropzone(type.class_index)}
              className="border border-gray-400 bg-white text-gray-800 hover:bg-blue-400 transition-colors duration-300 hover:text-white font-normal rounded-lg p-2"
            >
              { dropzoneVisibility[type.class_index] } Upload Images
            </button>
          </div>
          { dropzoneVisibility && selectedClassId === type.class_index &&  (
            <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-gray-100 mt-4">
              {successMessage && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  {successMessage}
                </div>
              )}
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 p-6 w-full text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop some files here, or click to select files</p>
                )}
              </div>
              {selectedFiles.length > 0 && (
                <>
                  <button
                    onClick={uploadFile}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-200 ease-in-out"
                  >
                    Upload File
                  </button>
                  <div className="grid grid-cols-4 gap-4 m-5">
                    {getCurrentPageFiles().map((file, index) => (
                      <div key={index} className="relative p-2 border border-gray-200 rounded-lg shadow-md bg-white">
                        <button
                          onClick={() => removeFile(file)}
                          className="absolute top-0 right-0 m-2 text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          width={150}
                          height={150}
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`py-2 px-4 rounded-full ${currentPage === 1 ? "bg-gray-200" : "bg-gray-300 hover:bg-gray-400"}`}
                    >
                      Previous
                    </button>
                    <div className="text-gray-600">
                      Page {currentPage} of {totalPages}
                    </div>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`py-2 px-4 rounded-full ${currentPage === totalPages ? "bg-gray-200" : "bg-gray-300 hover:bg-gray-400"}`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
      <ClassCreate isOpen={showCreate} onClose={handleCloseCreate} idproject={params.id} />
      {renameClassId && (
        <ClassRename
          isOpen={showRename}
          onClose={handleCloseRename}
          idproject={params.id}
          class_id={renameClassId}
          currentLabel={typedata.find(label => label.class_id === renameClassId)?.class_label || ""}
          onRename={RenameClass}
        />
      )}
    </>
  );
};

export default Classes;