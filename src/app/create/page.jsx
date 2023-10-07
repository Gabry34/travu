"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Navs/Nav";
import Stepper from "../components/Stepper/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Daysinputs from "../components/Create/DaysInput";
import Informations from "../components/Create/Informations";

export default function Page({ searchParams }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState("");
  const [daysDescriptions, setDaysDescriptions] = useState([]);
  const [days, setDays] = useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [travelPrice, setTravelPrice] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleDataFromChild = (data) => {
    setDaysDescriptions(data);
  };

  const daysFromChild = (data) => {
    setDays(data);
  };

  const handleCity = (data) => {
    setCity(data);
  };

  const handleState = (data) => {
    setState(data);
  };

  const handleTravelPrice = (data) => {
    setTravelPrice(data);
  };

  const handleShortDescription = (data) => {
    setShortDescription(data);
  };

  const handleTitle = (data) => {
    setTitle(data);
  };

  useEffect(() => {
    setStep(searchParams.step);
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="w-screen h-screen bg-customBlack flex justify-center items-center">
        <div className="spinner-simple w-[100px] h-[100px]"></div>
      </div>
    );
  }
  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <>
      <script src="../path/to/flowbite/dist/datepicker.js"></script>
      <Nav />
      <div className="w-full bg-customBlack flex flex-col px-20 py-10">
        <Stepper step={step} />
        {searchParams.step === "one" ? (
          <Informations
            passDays={daysFromChild}
            passCity={handleCity}
            passState={handleState}
            passTravelPrice={handleTravelPrice}
            passShortDescription={handleShortDescription}
            passTitle={handleTitle}
          />
        ) : searchParams.step === "two" ? (
          <Daysinputs days={days} onDataChange={handleDataFromChild} />
        ) : null}
      </div>
    </>
  );
}
