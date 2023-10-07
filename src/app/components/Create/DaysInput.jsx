"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function daysInput({ days, onDataChange, setStep }) {
  const [activityInputs, setActivityInputs] = useState(
    Array.from({ length: Number(days) }, () => "")
  );

  const handleActivityInputChange = (index, value) => {
    const updatedActivityInputs = [...activityInputs];
    updatedActivityInputs[index] = value;
    setActivityInputs(updatedActivityInputs);
  };

  useEffect(() => {
    onDataChange(activityInputs);
  }, [activityInputs]);

  const settingStepThree = () => {
    setStep("three");
  };

  const settingStepOne = () => {
    setStep("one");
  };
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
            onClick={settingStepOne}
          >
            Previus
          </Link>
          <Link
            href={{
              query: {
                step: "three",
              },
            }}
            className="border-[1px] border-white px-3 py-1 rounded-md"
            onClick={settingStepOne}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
