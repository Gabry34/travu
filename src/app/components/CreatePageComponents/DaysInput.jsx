import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function daysInput({ days, onDataChange }) {
  const [activityInputs, setActivityInputs] = useState(
    Array.from({ length: Number(days) }, () => "")
  );
  const [error, setError] = useState("");
  const [localData, setLocalData] = useState([]);

  const handleActivityInputChange = (index, value) => {
    const updatedActivityInputs = [...activityInputs];
    updatedActivityInputs[index] = value;
    setActivityInputs(updatedActivityInputs);
  };

  useEffect(() => {
    onDataChange(activityInputs);
  }, [activityInputs]);

  const settingStepThree = () => {
    if (activityInputs.every((input) => input.trim() !== "")) {
      localStorage.setItem("daysDescriptions", JSON.stringify(activityInputs));
    } else {
      setError("fill all the fields");
    }
  };

  useEffect(() => {
    // Verifica se "daysDescriptions" è presente in localStorage.
    const localData = localStorage.getItem("daysDescriptions");
    if (localData) {
      // Se esiste, imposta i dati nell'array activityInputs.
      setActivityInputs(JSON.parse(localData));
    }
  }, []);

  return (
    <div className="w-full px-20 py-16 pb-7 mt-10 flex flex-col items-center gap-10 border-[1px] border-white rounded-xl shadow-lg shadow-black">
      <h1 className="text-2xl">Make a description of each day</h1>
      <div className="w-full flex flex-col gap-5">
        {Array.from({ length: Number(days) }, (_, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <h1 className="text-2xl">Day {index + 1} (max: 350)</h1>
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
