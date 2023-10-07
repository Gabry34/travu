"use client";

import { useState, Fragment, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import States from "@/app/data/states.json";

export default function MyCombobox({ passState }) {
  const [selectedPerson, setSelectedPerson] = useState("United States");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? States
      : States.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    passState(selectedPerson);
  }, [selectedPerson]);

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        className="px-1"
        onChange={(event) => setQuery(event.target.value)}
        Value={(person) => person.name}
      />
      <Combobox.Options className="scroll w-[230px] max-h-[200px] overflow-y-scroll border-[1px] border-white">
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
