import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import PasswordInput from "../Inputs/passwordInput";

export default function editAccount() {
  const { data: session, status } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(session?.user.name);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [user, setUser] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const profileImage = selectedImage || session?.user.image;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (data) => {
    setPassword(data);
  };

  const handleConfirmedPassword = (data) => {
    setConfirmedPassword(data);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/register", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        console.log(data.users);
        setUser(data.users);
      } catch (error) {
        console.log("Error loading users: ", error);
      }
    };

    getUser();
  }, []);

  console.log(user);
  return (
    <div>
      <label
        className="btn btn-primary flex gap-1 items-center w-fit rounded-lg bg-transparent border-[1px] border-white"
        htmlFor="modal-2"
      >
        <img src="/edit.svg" alt="" className="w-7" />
        <h1 className="text-lg">Edit</h1>
      </label>

      <input className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 w-full h-[700px]">
          <label
            htmlFor="modal-2"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="pt-5 flex">
            <div
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="min-w-[200px] h-[200px] rounded-full"
            ></div>
            <div className="flex flex-col justify-between">
              <h1>Edit your profile image</h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-file input-file-primary"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1>Change name</h1>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full rounded-md px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <h1>Change password</h1>
            <PasswordInput passPassword={handlePassword} />
          </div>
          <div className="flex flex-col gap-1">
            <h1>Confirm password</h1>
            <PasswordInput passPassword={handleConfirmedPassword} />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <h1>Change biography</h1>
            <textarea
              rows="4"
              className="w-full px-2 py-1 outline-none rounded-md"
            ></textarea>
            {/* {user.length > 0 ? (
              user.map((u) => <h1 key={u._id}>{u.name}</h1>)
            ) : (
              <p>No users available</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
