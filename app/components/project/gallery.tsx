import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

interface IdType {
    idproject: string;
    class_id: string;
}

interface ImageData {
    image_path: string;
    iddetection: string;
    idsegmentation: string;
}

const IMAGE_PER_PAGE = 12;

const Gallery: React.FC<IdType> = ({ idproject, class_id }) => {

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await fetch(`${process.env.ORIGIN_URL}/classification/getImg`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idproject: idproject,
                    index: class_id
                })
            });
            const data = await response.json();
            // Assuming data is an array of image URLs or objects
            if (data && 'imgAll' in data && Array.isArray(data.imgAll)) {
              localStorage.setItem('displayimage', JSON.stringify(data.imgAll));
            }
          } catch (error) {
            console.error('Error fetching images:', error);
          }
        };
    
        fetchImages();
      }, []);

      return (
        <div>
          <h2>Loading images...</h2>
        </div>
      );

}

export default Gallery;