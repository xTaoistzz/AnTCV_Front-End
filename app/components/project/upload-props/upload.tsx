import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import Image from "next/image";

interface ProjectProps {
    idproject:string
  }

const Dropzone: React.FC<ProjectProps> = ({idproject}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const id = idproject;
  const type = localStorage.getItem("Type") || "";
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        console.log("File rejected:", fileRejections[0].file.name);
        // Handle file rejection here if needed
      } else {
        setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      }
    },
    []
  );

  const removeFile = (file: File) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const uploadFile = () => {
    if (selectedFiles.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("idproject",idproject)
    formData.append("type",type)
    

    fetch("http://localhost:5000/uploadImage", {
      method: "POST",
      body: formData,
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upload success:", data);
        // Handle success - e.g. update state or notify user
      })
      .catch((error) => {
        console.error("Error during upload:", error);
        // Handle error - e.g. notify user
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="text-center">
      <button
        onClick={uploadFile}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Upload File
      </button>
      <div
        className="border-2 border-gray-300 border-dashed rounded-lg p-4 text-center cursor-pointer m-5"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4 m-5">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative p-2 border border-gray-200 rounded">
            <button
              onClick={() => removeFile(file)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center focus:outline-none"
            >
              X
            </button>
            <Image
              src={URL.createObjectURL(file)}
              alt={`file-preview-${index}`}
              width={200}
              height={200}
              className="object-cover h-32 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropzone;