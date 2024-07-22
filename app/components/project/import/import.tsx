import React, { useState } from 'react';

interface ProjectProps {
    idproject: string;
}

const Import: React.FC<ProjectProps> = ({ idproject }) => {
    const type = localStorage.getItem("Type") || "";
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('idproject', idproject);

        try {
            const response = await fetch(`${process.env.ORIGIN_URL}/import/detection/YOLO`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                alert("File uploaded successfully!");
            } else {
                alert("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Import image with Labelling for <span className='capitalize'>{type}</span></h2>
            <div className="mb-4">
                <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100"
                />
            </div>
            <div>
                <button
                    onClick={handleUpload}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default Import;