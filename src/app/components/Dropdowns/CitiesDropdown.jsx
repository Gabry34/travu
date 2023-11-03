import React, { useState } from "react";
import Cities from "@/app/data/cities.json";
import Link from "next/link";
import { CiMapPin } from "react-icons/ci";
import { LiaMapPinSolid } from "react-icons/lia";
import { GoSearch } from "react-icons/go";

const CitiesSearchbar = () => {
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
  return (
    <div className="z-50">
      <div className="dropdown-container">
        <div className="dropdown border-[1px] rounded-full">
          <label
            className="btn btn-solid-primary px-0 w-[400px] bg-gray-500 bg-opacity-10 hover:bg-transparent cursor-default pr-3 rounded-full xs:w-full"
            tabIndex="0"
          >
            <input
              type="text"
              className="w-full h-full px-5 outline-none rounded-full text-white text-lg font-light bg-transparent"
              placeholder="Search a city..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <GoSearch size={24} color="white" />
          </label>
          <div className="scroll bg-customBlack border-[1px] dropdown-menu dropdown-menu-bottom-center w-full max-h-[350px] overflow-y-scroll p-2 mt-1 z-40">
            {filteredCities.slice(0, 100).map((city, index) => {
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
                  className="py-2 px-2 cursor-pointer hover:bg-white hover:bg-opacity-5 rounded-md flex gap-3 items-center"
                >
                  <LiaMapPinSolid size={40} />
                  <div>
                    <h1 className="text-xl">{city.name}</h1>
                    <h1 className="opacity-80 text-base">
                      {city.country_name}
                    </h1>
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

export default CitiesSearchbar;
