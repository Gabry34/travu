import React from "react";

export default function stepper({ step }) {
  return (
    <div className="w-full flex justify-center items-center px-20">
      <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        <li class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span class="flex gap-1 items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {step === "two" || step === "two" || step === "three" ? (
              <svg
                className="w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="blue"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            ) : (
              <p className="text-blue-500 text-xl">1</p>
            )}
            <h1 className="text-blue-500 text-xl">Informations</h1>
          </span>
        </li>
        <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span class="flex gap-1 items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {step === "three" ? (
              <svg
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="blue"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            ) : (
              <p
                className={
                  step === "two" || step === "three"
                    ? "text-blue-500 text-xl"
                    : "text-white text-xl"
                }
              >
                2
              </p>
            )}
            <h1
              className={
                step === "two" || step === "three"
                  ? "text-blue-500 text-xl"
                  : "text-white text-xl"
              }
            >
              Days
            </h1>
          </span>
        </li>
        <li class="flex gap-1 items-center">
          <p
            className={
              step === "three" ? "text-blue-500 text-xl" : "text-white text-xl"
            }
          >
            3
          </p>
          <h1
            className={
              step === "three" ? "text-blue-500 text-xl" : "text-white text-xl"
            }
          >
            Images
          </h1>
        </li>
      </ol>
    </div>
  );
}
