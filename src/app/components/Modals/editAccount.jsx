"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PasswordInput from "../Inputs/passwordInput";
import EditUser from "../Buttons/editUser";
import { AiOutlineEdit } from "react-icons/ai";

export default function EditAccount({ userInfoId }) {
  const { data: session, status } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(session?.user.name);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [biography, setBiography] = useState("");
  const [image, setImage] = useState("");
  // current data
  const [userId, setUserId] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentHashedPassword, setCurrentHashedPassword] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [currentSub, setCurrentSub] = useState("");

  // convert file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // handle passwords from child
  const handlePassword = (data) => {
    setPassword(data);
  };

  const handleConfirmedPassword = (data) => {
    setConfirmedPassword(data);
  };

  // fetch user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("https://travu-chi.vercel.app/api/register", {
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
          setCurrentName(u.name);
          setCurrentHashedPassword(u.hashedPassword);
        });
      } catch (error) {
        console.log("Error loading users: ", error);
      }
    };

    getUser();
  }, [session?.user.email]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetch("https://travu-chi.vercel.app/api/userInfo", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch userInfo");
        }
        const data = await res.json();
        const userInfos = data.userInfo;
        const userInfo = userInfos.filter((t) => {
          return t.email === session?.user.email;
        });
        userInfo.map((t) => {
          setCurrentImage(t.image);
          setCurrentSub(t.biography);
        });
        console.log(userInfo);
      } catch (error) {
        console.log("Error loading userInfos: ", error);
      }
    };

    getUserInfo();
  }, [session]);

  const handleImage = () => {
    const profileImage = selectedImage || currentImage;
    setImage(profileImage);
  };

  useEffect(() => {
    const profileImage = selectedImage || currentImage;
    setImage(profileImage);
  }, [handleImageChange, currentImage, selectedImage]);

  return (
    <div>
      <label
        className="btn btn-primary flex gap-1 items-center w-fit rounded-lg bg-transparent border-[1px] border-white px-0 xs:mt-2"
        htmlFor="modal-3"
        onClick={handleImage}
      >
        <AiOutlineEdit size={20} />
        <h1 className="text-lg text-white md:text-base xs:text-xs">Edit</h1>
      </label>

      <input className="modal-state" id="modal-3" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 w-full bg-black">
          <label
            htmlFor="modal-3"
            className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="pt-5 flex">
            <div
              style={{
                backgroundImage: `url(${selectedImage || currentImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="min-w-[200px] h-[200px] rounded-full"
            ></div>
            <div className="flex flex-col justify-between">
              <h1 className="text-white">Edit your profile image</h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-file"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-white">Change name</h1>
            <input
              type="text"
              defaultValue={session?.user.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full rounded-md px-2 py-1 outline-none bg-[#3B3B3B] text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 mt-5">
              <h1 className="text-white">Change password</h1>
              <PasswordInput passPassword={handlePassword} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-white">Confirm password</h1>
              <PasswordInput passPassword={handleConfirmedPassword} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <h1 className="text-white">Change biography</h1>
            <textarea
              rows="4"
              defaultValue={currentSub}
              className="w-full px-2 py-1 outline-none rounded-md text-white bg-[#3B3B3B]"
              onChange={(e) => {
                setBiography(e.target.value);
              }}
            ></textarea>
          </div>
          <EditUser
            userInfoId={userInfoId}
            id={userId}
            currentName={currentName}
            currentHashedPassword={currentHashedPassword}
            currentImage={currentImage}
            currentSub={currentSub}
            password={password}
            confirmedPassword={confirmedPassword}
            name={name}
            image={image}
            biography={biography}
          />
        </div>
      </div>
    </div>
  );
}
