import React, { useState } from "react";
import bcrypt from "bcryptjs-react";
import { signOut } from "next-auth/react";

export default function EditUser({
  userInfoId,
  id,
  currentName,
  name,
  currentHashedPassword,
  password,
  confirmedPassword,
  currentImage,
  image,
  currentSub,
  biography,
}) {
  const [error, setError] = useState("");

  // const newName = () => {
  //   if (name === currentName) {
  //     return currentName;
  //   } else {
  //     return name;
  //   }
  // };

  const newHashedPassword = async () => {
    if (password) {
      return await bcrypt.hash(password, 10);
    } else {
      return currentHashedPassword;
    }
  };

  const newImage = image || currentImage;
  const newBiography = biography || currentSub;

  const editUser = async (e) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      const confirmed = confirm("Are you sure? You will be logged out!");
      if (confirmed) {
        try {
          const hashedPassword = await newHashedPassword();
          const res = await fetch(
            `https://travu-chi.vercel.app/api/register/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                newName: "gabry",
                newHashedPassword: hashedPassword,
              }),
            }
          );

          if (!res.ok) {
            throw new Error("Failed to update register");
          } else {
            try {
              const res = await fetch(
                `https://travu-chi.vercel.app/api/userInfo/${userInfoId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    newImage,
                    newBiography,
                  }),
                }
              );

              if (!res.ok) {
                throw new Error("Failed to update userInfo");
              } else {
                signOut();
              }
            } catch (error) {
              setError("Failed to update userInfo: " + error.message);
            }
          }
        } catch (error) {
          setError("Failed to update user: " + error.message);
        }
      }
    } else {
      setError("Passwords don't match");
    }
  };
  return (
    <>
      <button onClick={editUser} className="w-full py-1 bg-blue-900 rounded-md">
        Submit
      </button>
      {error && (
        <div className="w-fit bg-red-600 rounded-md px-2 py-1 flex items-center justify-center">
          <h1>{error}</h1>
        </div>
      )}
    </>
  );
}
