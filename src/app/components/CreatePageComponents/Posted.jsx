import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Posted({}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const title = localStorage.getItem("title");
  const city = localStorage.getItem("city");
  const state = localStorage.getItem("state");
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");
  const images = JSON.parse(localStorage.getItem("images"));
  const description = localStorage.getItem("shortDescription");
  const travelPrice = localStorage.getItem("travelPrice");
  const daysDescriptions = JSON.parse(localStorage.getItem("daysDescriptions"));
  const userName = session?.user.name;
  const userEmail = session?.user.email;
  const userImage = session?.user.image;

  const createTravel = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/travels", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          city,
          state,
          startDate,
          endDate,
          images,
          description,
          travelPrice,
          daysDescriptions,
          duration,
          userName,
          userEmail,
          userImage,
        }),
      });
      if (res.ok) {
        router.push("/");
        localStorage.setItem("title", "");
        localStorage.setItem("city", "");
        localStorage.setItem("state", "");
        localStorage.setItem("startDate", "");
        localStorage.setItem("endDate", "");
        localStorage.setItem("travelPrice", "");
        localStorage.setItem("shortDescription", "");
        localStorage.setItem("daysDescriptions", []);
        localStorage.setItem("images", []);
      } else new Error("Failed to create a travel");
    } catch (error) {
      console.log(error);
    }
  };

  function calculateDaysDifference(startDate, endDate) {
    const startParts = startDate.split("-").map(Number);
    const endParts = endDate.split("-").map(Number);

    const startDateObj = new Date(
      startParts[2],
      startParts[1] - 1,
      startParts[0]
    );
    const endDateObj = new Date(endParts[2], endParts[1] - 1, endParts[0]);
    const timeDifference = endDateObj - startDateObj;

    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    return daysDifference + 1;
  }

  const duration = calculateDaysDifference(startDate, endDate);

  return (
    <div className="w-full px-20 py-16 pb-7 mt-10 flex flex-col gap-10 border-[1px] border-white rounded-xl shadow-lg shadow-black">
      <div className="w-full flex justify-center">
        <h1 className="text-5xl">Summary</h1>
      </div>
      <div className="flex flex-col gap-10 font-Poppins">
        <div className="flex items-end gap-2 ">
          <h1 className="text-4xl font-semibold">Title:</h1>
          <p className="text-4xl">{localStorage.getItem("title")}</p>
        </div>
        <div className="flex items-end gap-2 ">
          <h1 className="text-4xl font-semibold">City:</h1>
          <p className="text-4xl">{localStorage.getItem("city")}</p>
        </div>
        <div className="flex items-end gap-2 ">
          <h1 className="text-4xl font-semibold">State:</h1>
          <p className="text-4xl">{localStorage.getItem("state")}</p>
        </div>
        <div className="flex items-end gap-2 ">
          <h1 className="text-4xl font-semibold">Start Date:</h1>
          <p className="text-4xl">{localStorage.getItem("startDate")}</p>
        </div>
        <div className="flex items-end gap-2 ">
          <h1 className="text-4xl font-semibold">End Date:</h1>
          <p className="text-4xl">{localStorage.getItem("endDate")}</p>
        </div>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-4xl font-semibold">Short description:</h1>
          <p className="text-2xl">{localStorage.getItem("shortDescription")}</p>
        </div>
        <div className="flex items-end gap-2 ">
          <h1 className="text-4xl font-semibold">Travel price:</h1>
          <p className="text-4xl">${localStorage.getItem("travelPrice")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">Images:</h1>
          <div className="flex flex-wrap">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.base64URL}
                alt={`Immagine ${index}`}
                className="w-52"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl pb-2 font-semibold">Days descriptions:</h1>
          <div className="flex flex-col gap-5">
            {daysDescriptions.map((day, index) => (
              <div key={index} className="flex flex-col gap-1">
                <h1 className="text-3xl opacity-80">Day {index}</h1>
                <p className="text-2xl">{day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        href="/"
        className="w-full bg-customGray bg-opacity-40 flex justify-center py-2 text-3xl rounded-lg cursor-pointer"
        onClick={() => {
          createTravel();
        }}
      >
        Post
      </div>
    </div>
  );
}
