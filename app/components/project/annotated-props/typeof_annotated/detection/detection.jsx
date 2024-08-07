"use client";
import React, { useEffect, useRef, useState } from "react";
import { Annotorious } from "@recogito/annotorious";
import "@recogito/annotorious/dist/annotorious.min.css";

function ImageWithBoundingBox({ idproject, iddetection, imageUrl }) {
  const imgEl = useRef(null);
  const [anno, setAnno] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const fetchClassNames = async () => {
    try {
      const response = await fetch(
        `${process.env.ORIGIN_URL}/detection/class/${idproject}`,
        { credentials: "include" }
      );
      const data = await response.json();
      setVocabulary(data.strClass);
    } catch (error) {
      console.error("Error fetching class names:", error);
    }
  };

  const fetchBoundingBoxes = async () => {
    try {
      const response = await fetch(
        `${process.env.ORIGIN_URL}/detection/bounding_box/${iddetection}`,
        { credentials: "include" }
      );
      const data = await response.json();

      // Clear old annotations before setting new ones
      setAnnotations([]);

      if (anno) {
        anno.setAnnotations(data.annotation);
        const fetchedAnnotations = data.annotation.map((annotation) => {
          const shape = annotation.target.selector.value;
          const [x, y, width, height] = shape
            .split("=")[1]
            .split(":")[1]
            .split(",")
            .map(Number);

          return {
            id: annotation.id,
            x1: x,
            y1: y,
            x2: x + width,
            y2: y + height,
            width,
            height,
            class_label: annotation.body[0].value,
          };
        });

        setAnnotations(fetchedAnnotations);
      }
    } catch (error) {
      console.error("Error fetching bounding boxes:", error);
    }
  };

  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        widgets: [
          {
            widget: "TAG",
            vocabulary: vocabulary,
            style: {
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.375rem', // Equivalent to rounded-md in Tailwind
              padding: '0.5rem', // Equivalent to p-2 in Tailwind
              margin: '0.5rem', // Equivalent to m-2 in Tailwind
              fontSize: '0.875rem', // Equivalent to text-sm in Tailwind
            },
          },
        ],
      });

      annotorious.on("createAnnotation", (annotation) => {
        const shape = annotation.target.selector.value;
        const [x, y, width, height] = shape
          .split("=")[1]
          .split(":")[1]
          .split(",")
          .map(Number);

        const newAnnotation = {
          id: annotation.id,
          x1: x,
          y1: y,
          x2: x + width,
          y2: y + height,
          width,
          height,
          class_label: annotation.body[0].value,
        };

        setAnnotations((prevAnnotations) => [
          ...prevAnnotations,
          newAnnotation,
        ]);
      });

      annotorious.on("updateAnnotation", (annotation, previous) => {
        const shape = annotation.target.selector.value;
        const [x, y, width, height] = shape
          .split("=")[1]
          .split(":")[1]
          .split(",")
          .map(Number);

        const updatedAnnotation = {
          id: annotation.id,
          x1: x,
          y1: y,
          x2: x + width,
          y2: y + height,
          width,
          height,
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
      fetchBoundingBoxes();
    }
  }, [anno, iddetection]); // Added iddetection to the dependency array

  const autofetch = () => {
    fetchClassNames()
    fetchBoundingBoxes()
  }
  const sendBoundingBoxToBackend = async () => {
    const dataToSend = {
      idproject: idproject,
      iddetection: iddetection,
      bounding_box: annotations.map((annotation) => ({
        id: annotation.id,
        class_label: annotation.class_label,
        width: annotation.width,
        height: annotation.height,
        x1: annotation.x1,
        x2: annotation.x2,
        y1: annotation.y1,
        y2: annotation.y2,
      })),
    };

    try {
      const response = await fetch(
        `${process.env.ORIGIN_URL}/create/detection/bounding_box`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dataToSend),
        }
      );
      const result = await response.json();
      console.log("Success:", result);
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
      <div className="text-gray-500 mb-4">
        Draw some Bounding Box on images to add Label.
      </div>
      <div className="self-end mb-4 flex gap-2">
        <button
          onClick={sendBoundingBoxToBackend}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
      <div className="relative max-w-full" style={{ maxWidth: "50vw" }} onMouseMove={handleMouseMove}>
        <img
          onLoad={autofetch}
          ref={imgEl}
          src={imageUrl}
          alt="Annotated Image"
          className="rounded shadow-md mb-4 w-full h-auto"
          style={{ cursor: "crosshair" }}
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

export default ImageWithBoundingBox;