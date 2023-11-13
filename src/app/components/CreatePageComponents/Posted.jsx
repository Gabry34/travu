import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Posted({ imagesArray }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const title = localStorage.getItem("title");
  const city = localStorage.getItem("city");
  const state = localStorage.getItem("state");
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");
  const description = localStorage.getItem("shortDescription");
  const travelPrice = localStorage.getItem("travelPrice");
  const daysDescriptions = JSON.parse(localStorage.getItem("daysDescriptions"));
  const userName = session?.user.name;
  const userEmail = session?.user.email;
  const userImage = session?.user.image;

  useEffect(() => {
    setImages(imagesArray);
  }, [imagesArray]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/register", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        const users = data.users;
        const user = users.filter((u) => {
          return u.email === session?.user.email;
        });
        user.map((u) => {
          setUserId(u._id);
        });
      } catch (error) {
        console.log("Error loading users: ", error);
      }
    };

    getUser();
  }, [session?.user.email]);

  const createTravel = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      handlePost();
      try {
        const res = await fetch("http://localhost:3000/api/travels", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            city,
            state,
            startDate,
            endDate,
            images,
            description,
            travelPrice,
            daysDescriptions,
            duration,
            userName,
            userEmail,
            userImage,
            userId,
          }),
        });
        if (res.ok) {
          router.push("/");
          localStorage.setItem("title", "");
          localStorage.setItem("city", "");
          localStorage.setItem("state", "");
          localStorage.setItem("startDate", "");
          localStorage.setItem("endDate", "");
          localStorage.setItem("travelPrice", "");
          localStorage.setItem("shortDescription", "");
          localStorage.setItem("daysDescriptions", []);
          localStorage.setItem("images", []);
        } else new Error("Failed to create a travel");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function calculateDaysDifference(startDate, endDate) {
    const startParts = startDate.split("-").map(Number);
    const endParts = endDate.split("-").map(Number);

    const startDateObj = new Date(
      startParts[2],
      startParts[1] - 1,
      startParts[0]
    );
    const endDateObj = new Date(endParts[2], endParts[1] - 1, endParts[0]);
    const timeDifference = endDateObj - startDateObj;

    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    return daysDifference + 1;
  }

  const duration = calculateDaysDifference(startDate, endDate);

  const handlePost = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  };

  return (
    <button
      disabled={loading}
      href="/"
      className="border-[1px] border-white px-3 py-1 rounded-md"
      onClick={() => {
        createTravel();
      }}
    >
      {loading ? (
        <svg
          className="spinner-ring w-5 h-5"
          viewBox="25 25 50 50"
          strokeWidth="5"
        >
          <circle cx="50" cy="50" r="20" />
        </svg>
      ) : (
        <h1>Post</h1>
      )}
    </button>
  );
}
