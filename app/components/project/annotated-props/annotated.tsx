import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

interface IdType {
  idproject: string;
}

interface ImageData {
  image_path: string;
  iddetection: string;
  idsegmentation: string;
}

const IMAGE_PER_PAGE = 12;

export default function Annotate({ idproject }: IdType) {
  const Detection = dynamic(() => import("./typeof_annotated/detection/detection"), {
    ssr: false,
  });
  const Segmentation = dynamic(() => import("./typeof_annotated/segmentation/segmentation"), {
    ssr: false,
  });

  const [allUrl, setUrl] = useState<string[]>([]);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [allData, setAllData] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const type = typeof window !== "undefined" ? localStorage.getItem("Type") : null;
  const [isGalleryOpen, setGalleryOpen] = useState(true);

  const fetchExternalImages = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.ORIGIN_URL}/${type}/all${type}/${idproject}`, {
        credentials: "include",
      });
      const alldata = await res.json();
      if (type === "detection") {
        setAllData(alldata.detection);
        const urls = alldata.detection.map(
          (img: ImageData) => `${process.env.ORIGIN_URL}/img/${idproject}/thumbs/${img.image_path}`
        );
        setUrl(urls);
      } else if (type === "segmentation") {
        setAllData(alldata.segmentation);
        const urls = alldata.segmentation.map(
          (img: ImageData) => `${process.env.ORIGIN_URL}/img/${idproject}/thumbs/${img.image_path}`
        );
        setUrl(urls);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [idproject, type]);

  useEffect(() => {
    fetchExternalImages();
  }, [fetchExternalImages]);

  useEffect(() => {
    if (allUrl.length > 0) {
      setActiveUrl(allUrl[0]); // Set activeUrl to the first image in allUrl
    }
  }, [allUrl]);

  const totalPages = Math.ceil(allUrl.length / IMAGE_PER_PAGE);
  const displayImages = allUrl.slice(
    (currentPage - 1) * IMAGE_PER_PAGE,
    currentPage * IMAGE_PER_PAGE
  );

  const send_id_compared = (url: string) => {
    const img_url = url.replace("thumbs", "images");

    setActiveUrl(url);
    const image_path = url.split("/").pop();
    allData.forEach((com) => {
      if (type === "detection" && com.image_path === image_path) {
        localStorage.setItem("idDetection", com.iddetection);
      } else if (type === "segmentation" && com.image_path === image_path) {
        localStorage.setItem("idSegmentation", com.idsegmentation);
      }
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleGallery = () => {
    setGalleryOpen(!isGalleryOpen);
  };

  return (
    <div className="p-5">
      {type === "detection" && activeUrl && (
        <Detection
          idproject={idproject}
          iddetection={localStorage.getItem("idDetection")}
          imageUrl={activeUrl.replace("thumbs", "images")}
        />
      )}
      {type === "segmentation" && activeUrl && (
        <Segmentation
          idproject={idproject}
          idsegmentation={localStorage.getItem("idSegmentation")}
          imageUrl={activeUrl.replace("thumbs", "images")}
        />
      )}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-black rounded-t-lg shadow-lg transition-all duration-500 ${isGalleryOpen ? 'translate-y-0' : 'translate-y-2/3'}`}>
        <div className="flex justify-between items-center p-2">
          <button
            onClick={toggleGallery}
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            {isGalleryOpen ? "Collapse Gallery" : "Expand Gallery"}
          </button>
          <div className="flex justify-center space-x-2">
            <button
              onClick={handlePreviousPage}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-500 text-white"
              }`}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <span className="mx-2 px-2 py-1 rounded bg-gray-200 text-black">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-500 text-white"
              }`}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
        <div className={`flex overflow-x-auto p-4 ${isGalleryOpen ? 'opacity-100' : 'opacity-100'}`}>
          {displayImages.length > 0 ? (
            displayImages.map((url, index) => (
              <div key={index} className="relative group mx-2">
                <img
                  src={url}
                  alt={`Image ${index}`}
                  width={120}
                  height={120}
                  className={`rounded-lg shadow-lg h-auto object-cover cursor-pointer border-2 ${
                    activeUrl === url ? "border-yellow-400" : "border-transparent"
                  }`}
                  onClick={() => send_id_compared(url)}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white bg-black bg-opacity-75 rounded-full p-2 cursor-pointer hover:bg-opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => send_id_compared(url)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 mx-auto mt-4">
              You haven't selected any image. Please select an image to annotate.
            </div>
          )}
        </div>
        <div className="flex justify-center mt-2 text-gray-500">
          Total Images: {allUrl.length}
        </div>
      </div>
    </div>
  );
}