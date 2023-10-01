"use client";

import React, { useEffect, useState } from "react";
import travelJson from "@/app/travelExperiencies.json";

const Page = () => {
  const [lastSegment, setLastSegment] = useState();

  useEffect(() => {
    const currentURL = window.location.href;
    const urlSegments = currentURL.split("/");
    const segment = urlSegments[urlSegments.length - 1];
    setLastSegment(segment);
  }, []);

  const idInt = parseInt(lastSegment, 10);

  const travelInfo = travelJson.filter((t) => {
    return t.id === idInt;
  });

  return (
    <div className="bg-customBlack pt-5 flex flex-col w-screen px-20">
      <div className="pb-5">
        <img
          src="/arrow-left.svg"
          alt=""
          className="w-10 cursor-pointer"
          onClick={() => {
            history.back(-1);
          }}
        />
      </div>
      {travelInfo.map((travel) => (
        <div key={travel.id} className="w-full">
          <div className="flex gap-4">
            <div className="w-2/5 h-[400px] bg-gray-600 bg-opacity-10 rounded-md">
              {travel.images ? (
                <div
                  className="h-full flex justify-end items-end p-2 rounded-md"
                  style={{
                    backgroundImage: `url(${travel.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {travel.images[1] ? (
                    <img
                      src="/more-images.svg"
                      className="w-16 cursor-pointer"
                    />
                  ) : (
                    <p></p>
                  )}
                </div>
              ) : (
                <img src="/no-image-white.svg" className="w-[500px]" />
              )}
            </div>
            <div className="w-3/5 flex flex-col justify-between gap-10 py-1">
              <div className="flex flex-col gap-7">
                <h1 className="text-3xl">{travel.title}</h1>
                <p>{travel.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1>
                  {travel.startDate} - {travel.endDate}
                </h1>
                <h1>${travel.travelPrice}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
