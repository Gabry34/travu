"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../components/Cards/Card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log(session);
  const useremail = session?.user.email;

  useEffect(() => {
    const getTravels = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/travels`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch travels");
        }
        const data = await res.json();
        setTravels(data.travels);
        setDaysDescriptions(data.travels.daysDescriptions);
        setLoading(false);
      } catch (error) {
        console.log("Error loading travels: ", error);
      }
    };

    getTravels();
  }, []);

  const travelUser = travels.filter((t) => {
    return t.userEmail === useremail;
  });

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
    <div className="w-full min-h-screen bg-customBlack flex flex-col gap-10">
      <div className="px-20 pt-10 flex gap-10 justify-start">
        <div
          style={{
            backgroundImage: `url(${session?.user.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-96 h-96"
        ></div>
        <div className="py-10">
          <h1 className="text-2xl">{session?.user.name}</h1>
        </div>
      </div>
      <div className="px-20 pb-10">
        <h1 className="text-3xl">Your posts</h1>
        <div className="w-full flex flex-wrap pt-10 gap-5 bg-customBlack">
          {travelUser.map((t) => (
            <div
              className="w-[350px] rounded-xl bg-white bg-opacity-5 hover:bg-gray-500 hover:bg-opacity-10"
              key={t._id}
            >
              <Card travel={t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* <p>Hi {session?.user.name}</p>
      <Link
        href="/"
        onClick={() => {
          signOut();
        }}
      >
        signout
      </Link> */
}
