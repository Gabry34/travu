import React, { useState } from "react";
import months from "@/app/data/months.json";
import years from "@/app/data/years.json";
import Link from "next/link";

const Filters = ({ city, country }) => {
  const [minPrice, setMinPrice] = useState(0);
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
    <div className="h-fit rounded-md flex gap-5 justify-end">
      <div className="dropdown-container">
        <div className="dropdown">
          <label className="btn btn-solid-primary my-2" tabIndex="0">
            Travel price
          </label>
          <div className="dropdown-menu dropdown-menu-bottom-center bg-stone-800 flex flex-col gap-2 w-fit p-3">
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
      </div>
      <div className="dropdown-container justify-center">
        <div className="dropdown">
          <label className="btn btn-solid-primary my-2" tabIndex="0">
            Month
          </label>
          <div className="dropdown-menu dropdown-menu-bottom-center bg-stone-800 p-3">
            <select
              onChange={handleMonthChange}
              value={selectedMonth}
              className="custom-select text-white"
            >
              <option value="" className="">
                All months
              </option>
              {months.map((month) => (
                <option key={month.num} value={month.num} className="">
                  {month.month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="dropdown-container justify-center">
        <div className="dropdown">
          <label className="btn btn-solid-primary my-2" tabIndex="0">
            Year
          </label>
          <div className="dropdown-menu dropdown-menu-bottom-center bg-stone-800 p-3">
            <select
              onChange={handleYearChange}
              value={selectedYear}
              className=""
            >
              <option value="" className="">
                All years
              </option>
              {years.map((year) => (
                <option key={year.num} value={year.num} className="">
                  {year.year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="dropdown-container justify-center">
        <div className="dropdown">
          <label className="btn btn-solid-primary my-2" tabIndex="0">
            Duration
          </label>
          <div className="dropdown-menu dropdown-menu-bottom-center flex flex-row gap-2 items-center w-fit bg-stone-800 p-3">
            <input
              type="number"
              className="w-[60px] pl-1 outline-none"
              onChange={(event) => setDuration(event.target.value)}
              value={duration}
            />
            <h1>Days</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center ml-2">
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
          className="text-black bg-customGray rounded-lg px-3 py-2 font-medium"
        >
          Confirm
        </Link>
      </div>
    </div>
  );
};

export default Filters;