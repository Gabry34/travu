import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Images({ passImages }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length + images.length > 30) {
      alert("Max 30 images");
      return;
    }
    const imageObjects = selectedImages.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            base64URL: event.target.result,
          });
        };
        reader.readAsDataURL(image);
      });
    });

    Promise.all(imageObjects).then((base64Images) => {
      const updatedImages = [...images, ...base64Images];
      setImages(updatedImages);
    });
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    passImages(images);
  }, [images]);

  return (
    <div className="w-full min-h-[800px] px-20 py-16 pb-7 mt-10 flex flex-col justify-between gap-10 border-[1px] border-white rounded-xl shadow-lg shadow-black">
      <div className="flex flex-col gap-10">
        <div className="w-full flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="input-file input-file-primary"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-xl">Selected images:</h2>
          <div className="flex flex-wrap flex-row gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.base64URL}
                  alt={`Immagine ${index}`}
                  className="w-52"
                />
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <Link
          href={{
            query: {
              step: "two",
            },
          }}
          className="border-[1px] border-white px-3 py-1 rounded-md"
        >
          Previus
        </Link>
        {error ? <p className="text-red-500 text-xl">{error}</p> : <p></p>}
        {!images[0] ? (
          <button
            className="border-[1px] border-white px-3 py-1 rounded-md"
            onClick={() => {
              setError("Please insert at least one image");
            }}
          >
            Next
          </button>
        ) : (
          <Link
            className="border-[1px] border-white px-3 py-1 rounded-md"
            href={{
              query: {
                step: "posted",
              },
            }}
            onClick={() => {
              localStorage.setItem("images", JSON.stringify(images));
            }}
          >
            Finish
          </Link>
        )}
      </div>
    </div>
  );
}
