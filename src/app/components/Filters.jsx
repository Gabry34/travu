import React, { useState } from "react";
import months from "@/app/months.json";
import years from "@/app/years.json";
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
              />
            </div>
            <div className="flex gap-[2px] w-2/5 min-w-[130px]">
              <h1 className="text-white font-thin">$</h1>
              <input
                className="text-white bg-transparent border-[1px] border-gray-500 rounded-sm w-full outline-none px-1"
                type="number"
                placeholder="Max"
                onChange={(event) => setMaxPrice(event.target.value)}
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

{
  /* <div className="h-fit rounded-md p-3 flex gap-5">
<h1 className="text-black text-2xl font-semibold mb-2">Filters</h1>
<div className="flex flex-col gap-2">
  <h1 className="text-black font-semibold">travel price</h1>
  <div className="flex gap-2">
    <div className="flex gap-[1px] w-2/5">
      <h1 className="text-black">$</h1>
      <input
        className="text-black bg-white border-[1px] border-gray-500 rounded-sm w-full outline-none px-1"
        type="number"
        placeholder="Min"
        onChange={(event) => setMinPrice(event.target.value)}
      />
    </div>
    <div className="flex gap-[1px] w-2/5">
      <h1 className="text-black">$</h1>
      <input
        className="text-black bg-white border-[1px] border-gray-500 rounded-sm w-full outline-none px-1"
        type="number"
        placeholder="Max"
        onChange={(event) => setMaxPrice(event.target.value)}
      />
    </div>
  </div>
</div>
<div>
  <h1 className="text-black font-semibold">Month</h1>
  <select
    onChange={handleMonthChange}
    value={selectedMonth}
    className="bg-white text-black"
  >
    <option value="" className="bg-white text-black">
      All months
    </option>
    {months.map((month) => (
      <option
        key={month.num}
        value={month.num}
        className="bg-white text-black"
      >
        {month.month}
      </option>
    ))}
  </select>
</div>
<div>
  <h1 className="text-black font-semibold">Year</h1>
  <select
    onChange={handleYearChange}
    value={selectedYear}
    className="bg-white text-black"
  >
    <option value="" className="bg-white text-black">
      All years
    </option>
    {years.map((year) => (
      <option
        key={year.num}
        value={year.num}
        className="bg-white text-black"
      >
        {year.year}
      </option>
    ))}
  </select>
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
    },
  }}
  className="w-fit text-black bg-customGray rounded-md px-2 py-1 mt-5"
>
  Confirm
</Link>
</div> */
}
