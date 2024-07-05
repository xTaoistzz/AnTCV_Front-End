import Detection from "./typeof_annotated/detection/detection";
import Segmentation from "./typeof_annotated/segmentation/segmentation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface idType {
  idproject: string;
}

interface ImageData {
  image_path: string;
  iddetection: string;
  idsegmentation: string;
}

interface GalleryProps {
  idproject: string;
}

const IMAGE_PER_PAGE = 15;

export default function Annotate({ idproject }: idType) {
  const iddetection = localStorage.getItem("idDetection");
  const [allUrl, setUrl] = useState<string[]>([]);
  const [activeUrl, setActive] = useState<string | null>(null);
  const [allData, setAllData] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const type = typeof window !== "undefined" ? localStorage.getItem("Type") : null;

  const fetchExternalImages = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.ORIGIN_URL}/${type}/all${type}/${idproject}`,
        { credentials: "include" }
      );
      const alldata = await res.json();
      if (type === "detection") {
        const data: ImageData[] = alldata.detection;
        setAllData(alldata.detection);
        const urls = data.map((img) => {
          const url = `${process.env.ORIGIN_URL}/img/${idproject}/thumbs/${img.image_path}`;
          return url;
        });
        setUrl(urls);
      } else if (type === "segmentation") {
        const data: ImageData[] = alldata.segmentation;
        setAllData(alldata.segmentation);
        const urls = data.map((img) => {
          const url = `${process.env.ORIGIN_URL}/img/${idproject}/thumbs/${img.image_path}`;
          return url;
        });
        setUrl(urls);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [idproject, type]);

  useEffect(() => {
    fetchExternalImages();
  }, [fetchExternalImages]);

  const totalPages = Math.ceil(allUrl.length / IMAGE_PER_PAGE);
  const displayImages = allUrl.slice(
    (currentPage - 1) * IMAGE_PER_PAGE,
    currentPage * IMAGE_PER_PAGE
  );

  const send_id_compared = (url: string) => {
    const img_url = url.replace("thumbs", "images");

    setActive(url.replace("thumbs", "images"));
    const path = url.split("/");
    const image_path = path.pop();
    console.log(image_path);
    console.log(img_url);
    allData.forEach((com) => {
      if (type === "detection") {
        if (com.image_path === image_path) {
          localStorage.setItem("idDetection", com.iddetection);
        }
      } else if (type === "segmentation") {
        if (com.image_path === image_path) {
          localStorage.setItem("idSegmentation", com.idsegmentation);
        }
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

  return (
    <div className="p-5">
      {type === "detection" && activeUrl && (
        <Detection idproject={idproject} iddetection={iddetection} imageUrl={activeUrl} />
      )}
      {type === "segmentation" && <Segmentation />}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black">
        <div className="flex overflow-x-auto space-x-2">
          {displayImages.map((url, index) => (
            <Image
              className="border border-black rounded-md m-2 hover:border hover:border-gray-500"
              onClick={() => send_id_compared(url)}
              key={index}
              src={url}
              alt={`Image ${index}`}
              width={120}
              height={120}
            />
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={handlePreviousPage}
            className={`mx-1 px-2 py-1 rounded ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
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
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}