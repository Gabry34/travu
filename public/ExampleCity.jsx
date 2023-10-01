import React from "react";

const ExampleCity = () => {
  return (
    <div className="flex justify-center gap-10 pt-10">
      <div
        className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
        style={{
          backgroundImage: `url(/new-york.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">New York</h1>
      </div>
      <div
        className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
        style={{
          backgroundImage: `url(/rome.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">Rome</h1>
      </div>
      <div
        className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
        style={{
          backgroundImage: `url(/paris.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">Paris</h1>
      </div>
    </div>
  );
};

export default ExampleCity;
