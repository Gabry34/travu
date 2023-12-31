import React, { useState } from "react";
import months from "@/app/data/months.json";
import years from "@/app/data/years.json";
import Link from "next/link";

export default function Filter({ city, country }) {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [duration, setDuration] = useState();

  const handleMonthChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMonth(selectedValue);
  };

  const handleYearChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedYear(selectedValue);
  };
  return (
    <div className="dropdown">
      <label
        className="btn btn-solid-primary my-2 bg-transparent border-[1px] rounded-md text-lg text-white hover:bg-white hover:bg-opacity-5"
        tabIndex="0"
      >
        Filters
      </label>
      <div className="dropdown-menu w-fit md:dropdown-menu-bottom-right bg-customBlack border-[1px]">
        <div className="cursor-default flex flex-col gap-5 p-3">
          <h1 className="text-xl text-white">Filters</h1>
          <div className="flex flex-col gap-1">
            <h1 className="text-white">Travel price</h1>
            <div className="flex gap-2">
              <div className="flex gap-[2px] w-2/5 min-w-[130px]">
                <h1 className="text-white font-thin">$</h1>
                <input
                  className="text-white bg-transparent border-[1px] border-gray-500 rounded-sm w-full outline-none px-1"
                  type="number"
                  placeholder="Min"
                  onChange={(event) => setMinPrice(event.target.value)}
                  value={minPrice}
                />
              </div>
              <div className="flex gap-[2px] w-2/5 min-w-[130px]">
                <h1 className="text-white font-thin">$</h1>
                <input
                  className="text-white bg-transparent border-[1px] border-gray-500 rounded-sm w-full outline-none px-1"
                  type="number"
                  placeholder="Max"
                  onChange={(event) => setMaxPrice(event.target.value)}
                  value={maxPrice}
                />
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-white">Month</h1>
            <select
              onChange={handleMonthChange}
              value={selectedMonth}
              className="custom-select text-white w-full rounded-sm bg-transparent"
              style={{ border: "1px solid #303339" }}
            >
              <option value="" className="bg-customBlack">
                All months
              </option>
              {months.map((month) => (
                <option
                  key={month.num}
                  value={month.num}
                  className="bg-customBlack"
                >
                  {month.month}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <h1 className="text-white">Year</h1>
            <select
              onChange={handleYearChange}
              value={selectedYear}
              className="custom-select text-white w-full rounded-sm bg-transparent"
              style={{ border: "1px solid #303339" }}
            >
              <option className="bg-customBlack">All years</option>
              {years.map((year) => (
                <option
                  key={year.num}
                  value={year.num}
                  className="bg-customBlack"
                >
                  {year.year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1 className="text-white">Travel duration</h1>
            <div className="flex items-center gap-1 w-full">
              <input
                type="number"
                className="w-full pl-1 outline-none rounded-sm bg-transparent"
                style={{ border: "1px solid #303339" }}
                onChange={(event) => setDuration(event.target.value)}
                value={duration}
              />
              <h1 className="text-white">Days</h1>
            </div>
          </div>
          <Link
            href={{
              query: {
                city: city,
                country: country,
                minPrice: minPrice,
                maxPrice: maxPrice,
                year: selectedYear,
                month: selectedMonth,
                duration: duration,
              },
            }}
            className="text-white bg-transparent border-[1px] border-gray-500 rounded-sm px-3 py-2 font-medium flex justify-center"
          >
            Submit
          </Link>
        </div>
      </div>
    </div>
  );
}
