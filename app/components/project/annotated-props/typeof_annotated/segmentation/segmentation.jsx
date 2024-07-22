"use client";
import React, { useEffect, useRef, useState } from "react";
import { Annotorious } from "@recogito/annotorious";
import "@recogito/annotorious/dist/annotorious.min.css";
import Image from "next/image";

function ImageWithPolygon({ idproject, idsegmentation, imageUrl }) {
  const imgEl = useRef();
  const [anno, setAnno] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Fetch class names
  const fetchClassNames = async () => {
    try {
      const response = await fetch(
        `${process.env.ORIGIN_URL}/segmentation/class/${idproject}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setVocabulary(data.strClass);
    } catch (error) {
      console.error("Error fetching class names:", error);
    }
  };

  // Fetch polygons
  const fetchPolygon = async () => {
    try {
      const response = await fetch(
        `${process.env.ORIGIN_URL}/segmentation/polygon/${idsegmentation}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (anno) {
        anno.setAnnotations(data.annotation);
        const fetchedAnnotations = data.annotation.map((annotation) => {
          const shape = annotation.target.selector.value;
          const points = shape.match(/points="([^"]*)"/)[1];

          return {
            id: annotation.id,
            points: points,
            class_label: annotation.body[0].value,
          };
        });

        setAnnotations(fetchedAnnotations);
      }
    } catch (error) {
      console.error("Error fetching polygons:", error);
    }
  };

  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        tools: ["polygon"], // Specify only polygon tool
        widgets: [
          {
            widget: "TAG",
            vocabulary: vocabulary, // Set vocabulary here
          },
        ],
      });

      annotorious.setDrawingTool("polygon");

      annotorious.on("createAnnotation", (annotation) => {
        const shape = annotation.target.selector.value;
        const points = shape.match(/points="([^"]*)"/)[1];

        const newAnnotation = {
          id: annotation.id,
          points: points,
          class_label: annotation.body[0].value,
        };

        setAnnotations((prevAnnotations) => [
          ...prevAnnotations,
          newAnnotation,
        ]);
      });

      annotorious.on("updateAnnotation", (annotation, previous) => {
        const shape = annotation.target.selector.value;
        const points = shape.match(/points="([^"]*)"/)[1];

        const updatedAnnotation = {
          id: annotation.id,
          points: points,
          class_label: annotation.body[0].value,
        };

        setAnnotations((prevAnnotations) =>
          prevAnnotations.map((anno) =>
            anno.id === annotation.id ? updatedAnnotation : anno
          )
        );
      });

      annotorious.on("deleteAnnotation", (annotation) => {
        setAnnotations((prevAnnotations) =>
          prevAnnotations.filter((anno) => anno.id !== annotation.id)
        );
      });

      setAnno(annotorious);
    }

    return () => annotorious?.destroy();
  }, [vocabulary]);

  useEffect(() => {
    if (anno) {
      fetchPolygon();
    }
  }, [anno, idsegmentation]);

  const sendPolygonToBackend = async () => {
    const dataToSend = {
      idproject: idproject,
      idsegmentation: idsegmentation,
      polygon: annotations.map((annotation) => ({
        id: annotation.id,
        class_label: annotation.class_label,
        points: annotation.points,
      })),
    };

    try {
      const response = await fetch(`${process.env.ORIGIN_URL}/create/segmentation/polygon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      console.log("Success:", result);
      fetchPolygon(); // Refresh annotations after saving
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMouseMove = (event) => {
    const rect = imgEl.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMouseCoords({ x, y });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="self-end mt-4">
        <button
          onClick={sendPolygonToBackend}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
      <div className="relative" onMouseMove={handleMouseMove}>
        <img
          onLoad={fetchClassNames}
          ref={imgEl}
          src={imageUrl}
          alt="Annotated Image"
          className="rounded shadow-md mb-4"
          style={{ cursor: "crosshair", maxWidth: "100%", height: "auto" }}
        />
        <div
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <div
            className="absolute bg-red-500"
            style={{
              width: "1px",
              height: "100%",
              left: `${mouseCoords.x}px`,
              top: 0,
            }}
          ></div>
          <div
            className="absolute bg-red-500"
            style={{
              width: "100%",
              height: "1px",
              top: `${mouseCoords.y}px`,
              left: 0,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ImageWithPolygon;