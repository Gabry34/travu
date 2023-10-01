import React from "react";

const Card = ({ city }) => {
  const truncatedDescription = city.description
    .split(" ")
    .slice(0, 110)
    .join(" ");

  const goToTravelInformation = (id) => {
    window.location.href = `/search/${city.city}_${city.country}/${city.title}/${id}`;
  };

  return (
    <div
      className="rounded-lg flex gap-3 cursor-pointer p-3"
      onClick={() => goToTravelInformation(city.id)}
    >
      {!city.images[0] ? (
        <div className="min-w-[300px] h-[170px] rounded-lg flex justify-center items-center bg-gray-600 bg-opacity-10">
          <img src="/noimage.svg" className="w-24" />
        </div>
      ) : (
        <div
          className="min-w-[300px] h-[200px] rounded-lg"
          style={{
            backgroundImage: `url(${city.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}
      <div className="flex flex-col justify-between pr-2 w-full">
        <div className="flex items-baseline gap-5">
          <h1 className="font-medium text-xl">{city.title}</h1>
          <h1 className="text-sm">
            {city.city}, {city.country}
          </h1>
        </div>
        <div className="pb-2">
          <p className="text-sm font-medium">{truncatedDescription}...</p>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-base text-gray-600">
            {city.startDate} - {city.endDate}
          </h1>
          <h1 className="text-base">${city.travelPrice}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
