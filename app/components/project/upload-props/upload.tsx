import { useCallback, useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import Image from "next/image";

interface ProjectProps {
  idproject: string;
}

const Dropzone: React.FC<ProjectProps> = ({ idproject }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const id = idproject;
  const type = localStorage.getItem("Type") || "";
  const imagesPerPage = 12;

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
      formData.append("files", file);
    });
    formData.append("idproject", idproject);
    formData.append("type", type);

    fetch(`${process.env.ORIGIN_URL}/uploadImage`, {
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
        setSelectedFiles([]); // Clear files after successful upload
        setSuccessMessage("Images uploaded successfully!"); // Set success message
      })
      .catch((error) => {
        console.error("Error during upload:", error);
        // Handle error - e.g. notify user
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null); // Clear success message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg shadow-lg">
      {successMessage && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {successMessage}
        </div>
      )}
      {selectedFiles.length > 0 && (
        <button
          onClick={uploadFile}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-200 ease-in-out"
        >
          Upload File
        </button>
      )}
      <div
        className="border-4 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer m-6 hover:border-blue-600 transition duration-200 ease-in-out"
        {...getRootProps()}
      >
        {/* {isAddImage ?( */}
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-500">Drop the files here ...</p>
          ) : (
            <p className="text-gray-500">Drag and drop some files here, or click to select files</p>
          )}
        {/* ):(

        )} */}
        
      </div>
      <div className="grid grid-cols-4 gap-4 m-5">
        {getCurrentPageFiles().map((file, index) => (
          <div key={index} className="relative p-2 border border-gray-200 rounded-lg shadow-md bg-white">
            <button
              onClick={() => removeFile(file)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center focus:outline-none hover:bg-red-600 transition duration-200 ease-in-out"
            >
              X
            </button>
            <Image
              src={URL.createObjectURL(file)}
              alt={`file-preview-${index}`}
              width={100}
              height={100}
              className="object-cover h-32 w-full rounded-lg"
            />
          </div>
        ))}
      </div>
      {selectedFiles.length > imagesPerPage && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
          >
            Previous
          </button>
          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
          >
            Next
          </button>
        </div>
      )}
      <div className="mt-4 text-gray-500">
        Total Images: {selectedFiles.length}
      </div>
    </div>
  );
};

export default Dropzone;