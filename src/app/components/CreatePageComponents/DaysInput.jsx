import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DaysInput({ days, onDataChange }) {
  const [activityInputs, setActivityInputs] = useState(
    Array.from({ length: Number(days) }, () => "")
  );
  const [error, setError] = useState("");

  const handleActivityInputChange = (index, value) => {
    const updatedActivityInputs = [...activityInputs];
    updatedActivityInputs[index] = value;
    setActivityInputs(updatedActivityInputs);
  };

  useEffect(() => {
    onDataChange(activityInputs);
  }, [activityInputs, onDataChange]);

  useEffect(() => {
    const localData = localStorage.getItem("daysDescriptions");
    if (localData) {
      setActivityInputs(JSON.parse(localData));
    }
  }, []);

  const settingStepThree = () => {
    if (activityInputs.every((input) => input.trim() !== "")) {
      localStorage.setItem("daysDescriptions", JSON.stringify(activityInputs));
    } else {
      setError("fill all the fields");
    }
  };

  return (
    <div className="w-full px-20 py-16 pb-7 mt-10 flex flex-col items-center gap-10 border-[1px] border-white rounded-xl shadow-lg shadow-black xs:px-5">
      <h1 className="text-2xl text-white text-center 2xs:text-xl">
        Make a description of each day
      </h1>
      <div className="w-full flex flex-col gap-5">
        {Array.from({ length: Number(days) }, (_, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <h1 className="text-2xl text-white 2xs:text-xl">
              Day {index + 1} (max: 350)
            </h1>
            <textarea
              className="w-full px-1 text-lg rounded-sm"
              rows={3}
              maxLength={350}
              placeholder={`Activity for Day ${index + 1}`}
              value={activityInputs[index]}
              onChange={(e) => handleActivityInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="w-full flex justify-between">
          <Link
            href={{
              query: {
                step: "one",
              },
            }}
            className="border-[1px] border-white px-3 py-1 rounded-md"
          >
            Previus
          </Link>
          {error ? <p className="text-red-500 text-xl">{error}</p> : <p></p>}
          {!activityInputs.every((input) => input.trim() !== "") ? (
            <button
              className="border-[1px] border-white px-3 py-1 rounded-md"
              onClick={settingStepThree}
            >
              Next
            </button>
          ) : (
            <Link
              className="border-[1px] border-white px-3 py-1 rounded-md"
              href={{
                query: {
                  step: "three",
                },
              }}
              onClick={settingStepThree}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
