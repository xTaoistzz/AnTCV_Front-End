"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";

interface ImageData {
  image_path: string;
}

interface GalleryProps {
  idproject: string;
}

const IMAGE_PER_PAGE = 15;

export default function Gallery({ idproject }: GalleryProps) {
  const [allUrl, setUrl] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const type = typeof window !== "undefined" ? localStorage.getItem("Type") : null;
  const fetchExternalImages = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.ORIGIN_URL}/${type}/all${type}/${idproject}`,
        { credentials: "include" }
      );
      const alldata = await res.json();
      if (type === 'detection') {
        const data: ImageData[] = alldata.detection;
        const urls = data.map((img) => {
          return `${process.env.ORIGIN_URL}/img/${idproject}/thumbs/${img.image_path}`;
        });
        setUrl(urls);
      } else if (type === 'segmentation') {
        const data: ImageData[] = alldata.segmentation;
        const urls = data.map((img) => {
          return `${process.env.ORIGIN_URL}/img/${idproject}/thumbs/${img.image_path}`;
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

  const totalPages = Math.ceil(allUrl.length/ IMAGE_PER_PAGE);
  const displayImages = allUrl.slice(
    (currentPage - 1) * IMAGE_PER_PAGE,
    currentPage * IMAGE_PER_PAGE
  )

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-black">
      <div className="flex overflow-x-auto space-x-2">
        {displayImages.map((url, index) => (
          <Image
          onClick={()=> localStorage.setItem("ImgActive", url)}
            key={index}
            src={url}
            alt={`Image ${index}`}
            width={120}
            height={120}
          />
        ))}
      </div>
      <div className="flex justify-center mt-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-2 py-1 rounded ${
              index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}