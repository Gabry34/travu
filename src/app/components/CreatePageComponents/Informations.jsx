import React, { useEffect, useState } from "react";
import ComboCities from "../Dropdowns/ComboBoxCities";
import ComboStates from "../Dropdowns/ComboBoxStates";
import Link from "next/link";

export default function Informations({
  passDays,
  passTitle,
  passCity,
  passState,
  passTravelPrice,
  passShortDescription,
  passStartDate,
  passEndDate,
}) {
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState();
  const [travelPrice, setTravelPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    const date1Parts = startDate.split("-").map(Number);
    const date2Parts = endDate.split("-").map(Number);
    const date1 = new Date(date1Parts[2], date1Parts[1] - 1, date1Parts[0]);
    const date2 = new Date(date2Parts[2], date2Parts[1] - 1, date2Parts[0]);
    const timeDifference = date2.getTime() - date1.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    setDays(daysDifference);
  }, [startDate, endDate]);

  const saveData = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("travelPrice", travelPrice);
    localStorage.setItem("shortDescription", shortDescription);
  };

  useEffect(() => {
    passDays(days);
  }, [days]);

  useEffect(() => {
    passTravelPrice(travelPrice);
  }, [travelPrice]);

  useEffect(() => {
    passShortDescription(shortDescription);
  }, [shortDescription]);

  useEffect(() => {
    passTitle(title);
  }, [title]);

  useEffect(() => {
    passStartDate(startDate);
  }, [startDate]);

  useEffect(() => {
    passEndDate(endDate);
  }, [endDate]);

  const handleCity = (data) => {
    passCity(data);
    setCity(data);
  };

  const handleState = (data) => {
    passState(data);
    setState(data);
  };

  return (
    <div className="w-full px-20 py-16 pb-7 mt-10 flex flex-col gap-10 border-[1px] border-white rounded-xl shadow-lg shadow-black">
      {/* TITLE */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Title</h1>
        <input
          type="text"
          className="w-[230px] px-1 text-lg rounded-sm"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          maxLength={22}
        />
      </div>
      {/* CITY AND COUNTRY */}
      <div className="flex gap-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">City</h1>
          <ComboCities passCity={handleCity} />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">State</h1>
          <ComboStates passState={handleState} />
        </div>
      </div>
      {/* DATES */}
      <div className="flex gap-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Start date</h1>
          <input
            type="date"
            className="w-[230px] px-1 text-lg rounded-sm"
            onChange={(e) => {
              const dataArr = e.target.value.split("-");
              const year = dataArr[0];
              const month = dataArr[1];
              const day = dataArr[2];
              const formattedDate = `${day}-${month}-${year}`;
              setStartDate(formattedDate);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">End date</h1>
          <input
            type="date"
            className="w-[230px] px-1 text-lg rounded-sm"
            onChange={(e) => {
              const dataArr = e.target.value.split("-");
              const year = dataArr[0];
              const month = dataArr[1];
              const day = dataArr[2];
              const formattedDate = `${day}-${month}-${year}`;
              setEndDate(formattedDate);
            }}
          />
        </div>
      </div>
      {/* TRAVEL PRICE */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Travel price</h1>
        <div className="flex gap-1">
          <input
            type="number"
            className="w-[230px] px-1 text-lg rounded-sm"
            max={100000000}
            onChange={(e) => {
              setTravelPrice(e.target.value);
            }}
          />
          <h1>$</h1>
        </div>
      </div>
      {/* SHORT DESCRIPTION */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Short description (max: 1500)</h1>
        <textarea
          name=""
          id=""
          cols="100"
          rows="5"
          className="px-1 py-1 text-lg rounded-sm"
          maxLength={1500}
          onChange={(e) => {
            setShortDescription(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="w-full flex justify-between items-center">
        {error ? <h1 className="text-red-500 text-xl">{error}</h1> : <p></p>}
        {title && city && state && days && travelPrice && shortDescription ? (
          <Link
            href={{
              query: {
                step: "two",
              },
            }}
            className="border-[1px] border-white px-3 py-1 rounded-md"
            onClick={saveData}
          >
            Next
          </Link>
        ) : (
          <button
            className="border-[1px] border-white px-3 py-1 rounded-md"
            onClick={() => {
              setError("fill all the fields");
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
