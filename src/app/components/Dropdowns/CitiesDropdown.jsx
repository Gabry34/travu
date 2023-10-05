import React from "react";
import Cities from "@/app/data/cities.json";
import { useState } from "react";
import Link from "next/link";

const CitiesDropdown = () => {
  const [inputValue, setInputValue] = useState("");

  const filteredCities = Cities.filter((c) => {
    const nameMatch = c.name.toLowerCase().includes(inputValue.toLowerCase());
    // -----
    const stateNameMatch =
      c.state_name &&
      c.state_name.toLowerCase().includes(inputValue.toLowerCase());
    // -----
    const countryNameMatch = c.country_name
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    // -----
    const cc = `${c.name} ${c.country_name}`;
    const cityCountry = cc.toLowerCase().includes(inputValue.toLowerCase());
    // -----
    const ccvirgola = `${c.name}, ${c.country_name}`;
    const cityCountryVirgola = ccvirgola
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    // -----
    const ccvirgolaspazio = `${c.name},${c.country_name}`;
    const cityCountryVirgolaSpazio = ccvirgolaspazio
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    // -----
    const Icc = `${c.country_name} ${c.name}`;
    const IcityCountry = Icc.toLowerCase().includes(inputValue.toLowerCase());
    // -----
    const Iccvirgola = `${c.country_name}, ${c.name}`;
    const IcityCountryVirgola = Iccvirgola.toLowerCase().includes(
      inputValue.toLowerCase()
    );
    // -----
    const Iccvirgolaspazio = `${c.country_name},${c.name}`;
    const IcityCountryVirgolaSpazio = Iccvirgolaspazio.toLowerCase().includes(
      inputValue.toLowerCase()
    );

    return (
      nameMatch ||
      stateNameMatch ||
      countryNameMatch ||
      cityCountry ||
      cityCountryVirgola ||
      cityCountryVirgolaSpazio ||
      IcityCountry ||
      IcityCountryVirgola ||
      IcityCountryVirgolaSpazio
    );
  });

  const handleContentClick1 = (city, country) => {
    const newValue = `${city}, ${country}`;
    setInputValue(newValue);
  };

  const resetInput = () => {
    setInputValue("");
  };

  return (
    <div className="dropdown w-full flex justify-center items-center">
      <div className="w-2/5">
        <div className="flex bg-customBlack border-[1px] border-neutral-500 rounded-lg pr-3">
          <input
            type="text"
            className="w-full rounded-full h-12 px-7 pl-3 text-white text-2xl outline-none bg-customBlack"
            placeholder="Search a city or a country..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="dropdown-container bg-white w-full justify-start pr-10">
          <div className="scroll dropdown-menu dropdown-menu-bottom-center w-2/5 bg-white max-h-[350px] overflow-y-scroll">
            {filteredCities.slice(0, 300).map((city, index) => {
              return (
                <Link
                  key={index}
                  onClick={() =>
                    handleContentClick1(city.name, city.country_name)
                  }
                  href={{
                    pathname: `/search/${city.name}_${city.country_name}`,
                    query: {
                      city: city.name,
                      country: city.country_name,
                    },
                  }}
                  className="py-2 px-2 cursor-pointer hover:bg-slate-200 rounded-md flex gap-3"
                >
                  <img src="/pin.svg" className="w-8" />
                  <div>
                    <h1 className="text-black text-2xl">{city.name}</h1>
                    <h1 className="text-black">{city.country_name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitiesDropdown;
