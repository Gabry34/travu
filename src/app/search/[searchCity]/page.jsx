"use client";
import React, { useEffect, useState } from "react";
import travelJson from "@/app/data/travelExperiencies.json";
import Card from "@/app/components/Cards/Card";
import CitiesSearchbar from "@/app/components/Dropdowns/CitiesSearchbar";
import Filters from "@/app/components/Filters/Filters";

const Page = ({ searchParams }) => {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [duration, setDuration] = useState();

  useEffect(() => {
    setCity(searchParams.city);
    setCountry(searchParams.country);
    setMinPrice(searchParams.minPrice);
    setMaxPrice(searchParams.maxPrice);
    setSelectedMonth(searchParams.month);
    setSelectedYear(searchParams.year);
    setDuration(searchParams.duration);
  }, [searchParams]);

  const filteredTravels = travelJson.filter((t) => {
    if (city && country) {
      return t.city === city && t.country === country;
    } else if (t.city === t.city) {
      return true;
    }
  });

  const filteredPrices = filteredTravels.filter((t) => {
    if (minPrice && maxPrice) {
      return minPrice <= t.travelPrice && maxPrice >= t.travelPrice;
    } else if (minPrice && !maxPrice) {
      return minPrice <= t.travelPrice;
    } else if (!minPrice && maxPrice) {
      return maxPrice <= t.travelPrice;
    } else if (!minPrice && !maxPrice) {
      return true;
    }
  });

  const selectedMonthInt = parseInt(selectedMonth, 10);

  const filteredMonth = filteredPrices.filter((t) => {
    if (!isNaN(selectedMonthInt)) {
      const startDate = new Date(t.startDate);
      const month = startDate.getMonth() + 1;
      return selectedMonthInt === month;
    } else {
      return true;
    }
  });

  const selectedYearInt = parseInt(selectedYear, 10);

  const filteredYear = filteredMonth.filter((t) => {
    if (!isNaN(selectedYearInt)) {
      const startDate = new Date(t.startDate);
      const year = startDate.getFullYear();
      return selectedYearInt === year;
    } else {
      return true;
    }
  });

  const durationInt = parseInt(duration, 10);

  const filteredDuration = filteredYear.filter((t) => {
    if (durationInt) {
      const start = t.startDate;
      const end = t.endDate;

      function giorniTraDate(data1, data2) {
        const data1Arr = data1.split("/");
        const data2Arr = data2.split("/");
        const data1Obj = new Date(data1Arr[0], data1Arr[1] - 1, data1Arr[2]);
        const data2Obj = new Date(data2Arr[0], data2Arr[1] - 1, data2Arr[2]);
        const differenzaMs = Math.abs(data2Obj - data1Obj);
        const giorni = Math.floor(differenzaMs / (1000 * 60 * 60 * 24));
        return giorni;
      }

      return giorniTraDate(start, end) === durationInt;
    } else {
      return true;
    }
  });

  return (
    <div className="min-h-screen max-w-screen bg-customBlack flex flex-col gap-5">
      <div className="grid grid-cols-3 items-center px-20 pt-10">
        <CitiesSearchbar />
        <div className="flex justify-center items-center ">
          {city ? (
            <h1 className="text-2xl text-center">
              Results for "{city}, {country}"
            </h1>
          ) : (
            <h1 className="text-3xl">All Cities</h1>
          )}
        </div>
        <Filters city={city} country={country} />
      </div>
      <div className="flex w-full px-20 justify-center gap-5">
        <div className="w-full flex flex-col items-center gap-3 bg-customBlack">
          {filteredDuration.map((t) => (
            <div
              className="w-full border-[1px] border-neutral-500 rounded-lg hover:bg-gray-500 hover:bg-opacity-10"
              key={t.id}
            >
              <Card city={t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

{
  /* <div className="w-full px-20 pt-5">
        <img
          src="/arrow-left.svg"
          className="w-10 cursor-pointer"
          onClick={() => {
            history.back(-1);
          }}
        />
      </div> */
}
