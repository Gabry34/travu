"use client";
import React, { useEffect, useState } from "react";
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
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTravels = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/travels", {
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
        setLoading(false);
      }
    };

    getTravels();
  }, []);

  useEffect(() => {
    setCity(searchParams.city);
    setCountry(searchParams.country);
    setMinPrice(searchParams.minPrice);
    setMaxPrice(searchParams.maxPrice);
    setSelectedMonth(searchParams.month);
    setSelectedYear(searchParams.year);
    setDuration(searchParams.duration);
  }, [searchParams]);

  const filteredTravels = travels.filter((t) => {
    if (city && country) {
      return t.city === city && t.state === country;
    } else if (t.city === t.city) {
      return true;
    }
  });

  const filteredPrices = filteredTravels.filter((t) => {
    if (minPrice && maxPrice) {
      const travelPrice = parseFloat(t.travelPrice);
      return (
        !isNaN(travelPrice) && travelPrice > minPrice && travelPrice < maxPrice
      );
    } else if (minPrice && !maxPrice) {
      const travelPrice = parseFloat(t.travelPrice);
      return !isNaN(travelPrice) && travelPrice > minPrice;
    } else if (!minPrice && maxPrice) {
      const travelPrice = parseFloat(t.travelPrice);
      return !isNaN(travelPrice) && travelPrice < maxPrice && travelPrice > 0;
    } else if (!minPrice && !maxPrice) {
      return true;
    }
  });

  const selectedMonthInt = parseInt(selectedMonth, 10);
  const selectedYearInt = parseInt(selectedYear, 10);

  const filteredMonth = filteredPrices.filter((t) => {
    if (!isNaN(selectedMonthInt) && !isNaN(selectedYearInt)) {
      const startDate = t.startDate;
      const [travelMonth, travelDay, travelYear] = startDate
        .split("-")
        .map(Number);

      return selectedMonthInt === travelMonth && selectedYearInt === travelYear;
    } else if (!isNaN(selectedMonthInt) && isNaN(selectedYearInt)) {
      const startDate = t.startDate;
      const [travelMonth] = startDate.split("-").map(Number);

      return selectedMonthInt === travelMonth;
    } else if (isNaN(selectedMonthInt) && !isNaN(selectedYearInt)) {
      const startDate = t.startDate;
      const [, , travelYear] = startDate.split("-").map(Number);

      return selectedYearInt === travelYear;
    } else {
      return true;
    }
  });

  const filteredDuration = filteredMonth.filter((t) => {
    const durationInt = parseInt(duration, 10);
    if (durationInt) {
      const start = t.startDate;
      const end = t.endDate;

      function giorniTraDate(data1, data2) {
        const data1Arr = data1.split("-");
        const data2Arr = data2.split("-");
        const data1Obj = new Date(data1Arr[0], data1Arr[1] - 1, data1Arr[2]);
        const data2Obj = new Date(data2Arr[0], data2Arr[1] - 1, data2Arr[2]);
        const differenzaMs = Math.abs(data2Obj - data1Obj);
        const giorni = Math.floor(differenzaMs / (1000 * 60 * 60 * 24));
        return giorni;
      }

      console.log(giorniTraDate(start, end));

      return giorniTraDate(start, end) === durationInt;
    } else {
      return true;
    }
  });

  return (
    <div className="max-w-screen bg-customBlack flex flex-col gap-5">
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
        {loading ? (
          <div className="h-[700px] flex items-center justify-center">
            <progress className="progress w-[500px] h-3"></progress>
          </div>
        ) : (
          <div className="w-full flex flex-wrap pt-10 gap-5 bg-customBlack">
            {filteredDuration.map((t) => (
              <div
                className="w-[325px] rounded-xl bg-white bg-opacity-5 hover:bg-gray-500 hover:bg-opacity-10"
                key={t._id}
              >
                <Card travel={t} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
