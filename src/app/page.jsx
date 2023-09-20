"use client";

import Cities from "@/app/cities.json";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const filteredCities = Cities.filter((c) => {
    const nameMatch = c.name.toLowerCase().includes(inputValue.toLowerCase());
    const stateNameMatch =
      c.state_name &&
      c.state_name.toLowerCase().includes(inputValue.toLowerCase());
    const countryNameMatch = c.country_name
      .toLowerCase()
      .includes(inputValue.toLowerCase());

    return nameMatch || stateNameMatch || countryNameMatch;
  });

  const handleContentClick1 = (city, country) => {
    const newValue = `${city}, ${country}`;
    setInputValue(newValue);
  };

  const resetInput = () => {
    setInputValue("");
  };

  return (
    <div className="max-w-full bg-white">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute flex flex-col items-center">
          <h1 className="font-Tenor text-9xl">travu</h1>
          <p className="font-Work text-xl">
            Your Passport to Shared Experiences
          </p>
        </div>
        <img src="/paesaggi.jpg" className="min-h-[500px]" />
      </div>
      <div className="dropdown w-full flex justify-center relative bottom-6 items-center">
        <div className="w-2/5">
          <div className="flex bg-white border-[1px] border-neutral-500 rounded-full pr-2">
            <input
              type="text"
              className="w-full rounded-full h-12 px-7 text-black text-2xl outline-none bg-white"
              placeholder="Search a city or a country..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <img
              src="/x.svg"
              className="w-8 cursor-pointer"
              onClick={resetInput}
            />
          </div>
          <div className="dropdown-container justify-center bg-white">
            <div className="scroll dropdown-menu dropdown-menu-bottom-center w-2/5 bg-white max-h-[350px] overflow-y-scroll">
              {filteredCities.slice(0, 300).map((city, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      handleContentClick1(city.name, city.country_name)
                    }
                    className="py-2 px-2 cursor-pointer hover:bg-slate-200 rounded-md flex gap-3"
                  >
                    <img src="/pin.svg" className="w-8" />
                    <div>
                      <h1 className="text-black text-2xl">{city.name}</h1>
                      <h1 className="text-black">{city.country_name}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
}
