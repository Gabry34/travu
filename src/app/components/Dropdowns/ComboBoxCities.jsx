"use client";

import { useState, Fragment, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import Cities from "@/app/data/cities.json";

export default function MyCombobox({ passCity }) {
  const [selectedPerson, setSelectedPerson] = useState(
    localStorage.getItem("city")
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    passCity(selectedPerson);
  }, [selectedPerson, passCity]);

  const filteredPeople =
    query === ""
      ? Cities
      : Cities.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox defaultValue={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        className="px-1"
        onChange={(event) => setQuery(event.target.value)}
        Value={(person) => person.name}
      />
      <Combobox.Options className="scroll w-[230px] max-h-[200px] overflow-y-scroll border-[1px] border-white 2xs:w-full">
        {filteredPeople.slice(0, 50).map((person) => (
          <Combobox.Option key={person.id} value={person.name} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active
                    ? "bg-blue-500 text-white"
                    : "bg-customBlack text-white"
                }`}
              >
                {person.name}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
