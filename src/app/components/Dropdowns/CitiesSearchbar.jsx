import React, { useState } from "react";
import Cities from "@/app/data/cities.json";
import Link from "next/link";

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
    <div>
      <div className="dropdown-container">
        <div className="dropdown">
          <label
            className="btn btn-solid-primary my-2 px-0 w-[500px] bg-searchBarGray hover:bg-searchBarGray cursor-default pr-3"
            tabIndex="0"
          >
            <input
              type="text"
              className="w-full h-full px-3 outline-none rounded-lg text-white text-lg font-light"
              placeholder="Search a city..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <img src="/search.svg" alt="" className="w-5" />
          </label>
          <div className="scroll dropdown-menu dropdown-menu-bottom-center w-full max-h-[350px] overflow-y-scroll p-2 ">
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
                  className="py-2 px-2 cursor-pointer hover:bg-zinc-700 rounded-md flex gap-3"
                >
                  <img src="/pin-black.svg" className="w-8" />
                  <div>
                    <h1 className="text-2xl">{city.name}</h1>
                    <h1 className="opacity-80">{city.country_name}</h1>
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
