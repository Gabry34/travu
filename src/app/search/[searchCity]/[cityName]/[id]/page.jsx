"use client";

import React, { useEffect, useState } from "react";
import ImagesSlider from "@/app/components/Modals/imagesSlider";
import Avatar from "@/app/components/ui/Avatar";
import { GoDot } from "react-icons/go";
import { BsArrowLeft } from "react-icons/bs";

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
    <div className="bg-customBlack pt-5 flex flex-col px-20 xs:px-5">
      <div className="pb-5">
        <BsArrowLeft
          size={32}
          className="cursor-pointer"
          onClick={() => {
            history.back(-1);
          }}
        />
      </div>
      {!loading ? (
        <div>
          {travelInfo.map((travel) => (
            <div key={travel._id} className="w-full">
              <div className="flex gap-4 lg:flex-col">
                <div className="w-2/5 h-[500px] bg-gray-600 bg-opacity-10 rounded-md lg:w-full xs:h-[300px]">
                  <div
                    className="h-full flex justify-end items-end p-2 rounded-md"
                    style={{
                      backgroundImage: `url(${travel.images[0].base64URL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {travel.images[1] ? (
                      <ImagesSlider images={travel.images} />
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
                <div className="w-3/5 flex flex-col justify-between gap-10 py-1 lg:w-full">
                  <div className="flex flex-col gap-7">
                    <div className="flex justify-between items-center xs:flex-col xs:gap-2 xs:items-start">
                      <h1 className="text-3xl first-letter:uppercase">
                        {travel.title}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Avatar userId={travel.userId} />
                        <h1>{travel.userName}</h1>
                      </div>
                    </div>
                    <p className="text-lg first-letter:uppercase 2xs:text-base">
                      {travel.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl 2xs:text-lg">
                      {travel.startDate} - {travel.endDate}
                    </h1>
                    <h1 className="text-xl 2xs:text-lg">
                      ${travel.travelPrice}
                    </h1>
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
      <div className="py-10 flex flex-col gap-4">
        {daysDescriptions?.map((day, index) => (
          <div key={index} className="flex gap-1">
            {" "}
            {/* Add key prop here */}
            <div className="pt-2">
              <GoDot size={20} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl opacity-80 2xs:text-2xl">
                Day {index + 1}
              </h1>
              <p className="text-xl 2xs:text-lg">{day}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
