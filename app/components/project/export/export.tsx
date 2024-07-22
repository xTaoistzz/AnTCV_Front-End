import React, { useState, useEffect } from "react";

interface ProjectProps {
  idproject: string;
}

const Export: React.FC<ProjectProps> = ({ idproject }) => {
  const [type, setType] = useState<string | null>(null); // State to hold type fetched from localStorage
  const [formats, setFormats] = useState<string[]>(["YOLO", "COCO"]); // State to hold formats fetched from API
  const [selectedFormat, setSelectedFormat] = useState<string>("YOLO"); // Default selected format
  const [projectName, setProjectName] = useState<string | null>(null); // State to hold project name from localStorage

  useEffect(() => {
    // Fetch type and project name from localStorage
    const typeFromLocalStorage = localStorage.getItem("Type");
    const projectNameFromLocalStorage = localStorage.getItem("Project_Name");
    
    if (typeFromLocalStorage) {
      setType(typeFromLocalStorage);
    }
    if (projectNameFromLocalStorage) {
      setProjectName(projectNameFromLocalStorage);
    }

  }, []);

  const handleExport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Prepare data to export
    const exportData = {
      type: type,
      idproject: idproject,
      format: selectedFormat
    };

    // Example of fetching data
    try {
      const response = await fetch(`${process.env.ORIGIN_URL}/export/format`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exportData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      // Get filename from response headers or use project name
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = projectName ? `${projectName}.zip` : 'export.zip'; // Default filename
      if (contentDisposition) {
        filename = contentDisposition.split('filename=')[1].trim();
      }

      // Create blob object URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create an anchor element and simulate click to download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up object URL
      URL.revokeObjectURL(url);

      console.log("Export successful");

    } catch (error) {
      console.error("Error exporting data:", error);
      // Handle error logic here
    }
  };

  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-4">
        <div className="text-xl font-bold">Export</div>
      </div>
      <form onSubmit={handleExport}>
        <div className="flex items-center justify-center mt-4">
          <label htmlFor="format" className="mr-2">
            Select Format:
          </label>
          <select
            id="format"
            name="format"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            {formats.map((format, index) => (
              <option key={index} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-200 ease-in-out"
          >
            Export
          </button>
        </div>
      </form>
    </div>
  );
};

export default Export;