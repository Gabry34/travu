"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [lastSegment, setLastSegment] = useState();
  const [travels, setTravels] = useState([]);
  const [daysDescriptions, setDaysDescriptions] = useState([]);
  const [openSlider, setOpenSlider] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentURL = window.location.href;
    const urlSegments = currentURL.split("/");
    const segment = urlSegments[urlSegments.length - 1];
    setLastSegment(segment);
  }, []);

  useEffect(() => {
    const getTravels = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/travels`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch travels");
        }
        const data = await res.json();
        setTravels(data.travels);
        setLoading(false);
      } catch (error) {
        console.log("Error loading travels: ", error);
      }
    };

    getTravels();
  }, []);

  const travelInfo = travels.filter((t) => {
    return t._id === lastSegment;
  });

  useEffect(() => {
    travelInfo.map((t) => {
      setDaysDescriptions(t.daysDescriptions);
    });
  }, [travelInfo]);

  return (
    <div className="bg-customBlack pt-5 flex flex-col px-20">
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
      {!loading ? (
        <div>
          {travelInfo.map((travel) => (
            <div key={travel._id} className="w-full">
              <div className="flex gap-4">
                <div className="w-2/5 h-[500px] bg-gray-600 bg-opacity-10 rounded-md">
                  {travel.images ? (
                    <div
                      className="h-full flex justify-end items-end p-2 rounded-md"
                      style={{
                        backgroundImage: `url(${travel.images[0].base64URL})`,
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
                    <div className="flex justify-between items-center">
                      <h1 className="text-3xl first-letter:uppercase">
                        {travel.title}
                      </h1>
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            backgroundImage: `url(${travel.userImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          className="w-8 h-8"
                        ></div>
                        <h1>{travel.userName}</h1>
                      </div>
                    </div>
                    <p className="text-lg first-letter:uppercase">
                      {travel.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl">
                      {travel.startDate} - {travel.endDate}
                    </h1>
                    <h1 className="text-xl">${travel.travelPrice}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[700px] flex items-center justify-center">
          <progress className="progress w-[500px] h-3"></progress>
        </div>
      )}
      <div>
        {daysDescriptions?.map((day, index) => (
          <div key={index} className="flex flex-col gap-1">
            <h1 className="text-3xl opacity-80">Day {index}</h1>
            <p className="text-2xl">{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
