import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Avatar({ userId }) {
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/register/", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        const users = data.users;
        const user = users.filter((u) => {
          return u._id === userId;
        });
        user.map((u) => {
          setEmail(u.email);
        });
      } catch (error) {
        console.log("Error loading users: ", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/userInfo", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch userInfo");
        }
        const data = await res.json();
        const userInfos = data.userInfo;
        const userInfo = userInfos.filter((t) => {
          return t.email === email;
        });
        console.log("UserInfo:", userInfo);
        userInfo.map((t) => {
          setImage(t.image);
        });
      } catch (error) {
        console.log("Error loading userInfos: ", error);
      }
    };

    getUserInfo();
  }, [email]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt="Image Alt Text"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        ) : (
          <svg
            className="spinner-ring w-full h-full"
            viewBox="25 25 50 50"
            strokeWidth="5"
          >
            <circle cx="50" cy="50" r="20" />
          </svg>
        )}
      </div>
    </div>
  );
}
