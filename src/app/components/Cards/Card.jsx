import React from "react";
import DeleteButton from "../Buttons/deleteButton";
import LikeButton from "../Buttons/likeButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "../ui/Avatar";

const Card = ({ travel, isDashboard }) => {
  const { data: session } = useSession();
  const goToTravelInformation = (id) => {
    window.location.href = `/search/${travel.city}_${travel.state}/${travel.title}/${id}`;
  };

  return (
    <div
      className="rounded-xl flex flex-col gap-1 p-2 select-none hover:bg-white hover:bg-opacity-5 cursor-pointer"
      onClick={() => goToTravelInformation(travel._id)}
    >
      <div className="min-w-[300px] h-[300px] rounded-xl relative">
        {travel.images[0] ? (
          <Image
            src={travel.images[0].base64URL}
            alt={travel.title}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        ) : (
          <Image
            src="/noimage.svg"
            alt="No Image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        )}
        <div className="z-10 absolute top-0 left-0 right-0 bottom-0 p-1">
          {travel.userEmail !== session?.user.email ? (
            <LikeButton travelId={travel._id} />
          ) : null}
        </div>
      </div>
      <div className="flex gap-1 flex-col justify-around px-1 w-full select-none">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium font-Montserrat first-letter:uppercase pt-1 overflow-hidden break-words select-none">
              {travel.title}
            </h1>
            <Avatar userId={travel.userId} />
          </div>
          <div className="flex items-center gap-2">
            <p className="select-none text-sm text-opacity-50 text-white">
              {travel.city}, {travel.state}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="select-none text-sm text-opacity-50 text-white">
                {travel.startDate} - {travel.endDate}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="select-none text-sm text-opacity-50 text-white">
                ${travel.travelPrice}
              </p>
            </div>
          </div>
        </div>
        {isDashboard && travel.userEmail === session?.user.email ? (
          <DeleteButton id={travel._id} />
        ) : null}
      </div>
    </div>
  );
};

export default Card;
