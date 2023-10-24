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
        !isNaN(travelPrice) &&
        travelPrice >= minPrice &&
        travelPrice <= maxPrice
      );
    } else if (minPrice && !maxPrice) {
      const travelPrice = parseFloat(t.travelPrice);
      return !isNaN(travelPrice) && travelPrice >= minPrice;
    } else if (!minPrice && maxPrice) {
      const travelPrice = parseFloat(t.travelPrice);
      return !isNaN(travelPrice) && travelPrice <= maxPrice && travelPrice > 0;
    } else if (!minPrice && !maxPrice) {
      return true;
    }
  });

  const filteredMonth = filteredPrices.filter((t) => {
    if (selectedMonth) {
      const dateComponents = t.startDate.split("-");
      if (dateComponents.length === 3) {
        const month = parseInt(dateComponents[1], 10);
        const selectedMonthNumber = parseInt(selectedMonth, 10);
        return month === selectedMonthNumber;
      }
    } else {
      return true;
    }
  });

  const filteredYear = filteredMonth.filter((t) => {
    if (selectedYear) {
      const dateComponents = t.startDate.split("-");
      if (dateComponents.length === 3) {
        const year = parseInt(dateComponents[2], 10);
        const selectedYearNumber = parseInt(selectedYear, 10);
        return year === selectedYearNumber;
      }
    } else {
      return true;
    }
  });

  const calculateDaysDifference = (startDate, endDate) => {
    const startDateComponents = startDate.split("-");
    const endDateComponents = endDate.split("-");

    if (startDateComponents.length === 3 && endDateComponents.length === 3) {
      const startDay = parseInt(startDateComponents[0], 10);
      const startMonth = parseInt(startDateComponents[1], 10) - 1; // Mese inizia da 0 (gennaio)
      const startYear = parseInt(startDateComponents[2], 10);

      const endDay = parseInt(endDateComponents[0], 10);
      const endMonth = parseInt(endDateComponents[1], 10) - 1; // Mese inizia da 0 (gennaio)
      const endYear = parseInt(endDateComponents[2], 10);

      const start = new Date(startYear, startMonth, startDay);
      const end = new Date(endYear, endMonth, endDay);

      const timeDifference = end - start;
      const daysDifference = timeDifference / (1000 * 3600 * 24); // Calcola il numero di giorni

      return daysDifference;
    }

    return 0; // Ritorna 0 se le date non sono valide
  };

  // ...

  const durationFilter = filteredYear.filter((t) => {
    const daysDifference = calculateDaysDifference(t.startDate, t.endDate);
    return !duration || daysDifference === duration;
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
            {durationFilter.map((t) => (
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
