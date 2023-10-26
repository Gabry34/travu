import React from "react";
import DeleteButton from "../Buttons/deleteButton";
import LikeButton from "../Buttons/likeButton";

const Card = ({ travel, isDashboard }) => {
  const truncatedDescription = travel.description
    .split(" ")
    .slice(0, 25)
    .join(" ");

  const goToTravelInformation = (id) => {
    window.location.href = `/search/${travel.city}_${travel.state}/${travel.title}/${id}`;
  };

  return (
    <div
      className="rounded-xl flex flex-col gap-1 p-2 select-none"
      draggable={false}
    >
      {!travel.images[0] ? (
        <div className="min-w-[300px] h-[170px] rounded-xl flex justify-center items-center bg-gray-600 bg-opacity-10">
          <img src="/noimage.svg" className="w-24" />
        </div>
      ) : (
        <div
          className="min-w-[300px] h-[200px] rounded-sm rounded-t-lg"
          style={{
            backgroundImage: `url(${travel.images[0].base64URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <LikeButton travelId={travel._id} />
        </div>
      )}
      <div
        className="flex gap-1 flex-col justify-around px-1 w-full select-none"
        draggable={false}
      >
        <div className="flex flex-col gap-2">
          <h1
            className="text-2xl font-Poppins first-letter:uppercase pt-1 overflow-hidden break-words select-none"
            draggable={false}
          >
            {travel.title}
          </h1>
          <div className="min-h-[95px] max-h-[95px] overflow-hidden">
            <p
              className="max-w-full overflow-hidden break-words h-full select-none"
              draggable={false}
            >
              {truncatedDescription}
              {travel.description.length > 25 ? <span>...</span> : null}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {/* <img
              src="/time.svg"
              alt=""
              className="w-6 select-none"
              draggable={false}
            /> */}
            <p className="select-none" draggable={false}>
              - {travel.startDate} - {travel.endDate}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {/* <img
              src="/pin-red.svg"
              alt=""
              className="w-6 select-none"
              draggable={false}
            /> */}
            <p className="select-none" draggable={false}>
              - {travel.city}, {travel.state}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {/* <img
              src="/money.svg"
              alt=""
              className="w-6 select-none"
              draggable={false}
            /> */}
            <p className="select-none" draggable={false}>
              - ${travel.travelPrice}
            </p>
          </div>
        </div>
        <button
          className="w-full py-1 px-2 bg-blue-900 rounded-md mt-3"
          onClick={() => goToTravelInformation(travel._id)}
        >
          View
        </button>
        {isDashboard ? <DeleteButton id={travel._id} /> : null}
      </div>
    </div>
  );
};

export default Card;
