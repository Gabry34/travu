import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function UserDropdown({ border }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState("");

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
          return t.email === session?.user.email;
        });
        userInfo.map((t) => {
          setImage(t.image);
        });
        console.log(userInfo);
      } catch (error) {
        console.log("Error loading userInfos: ", error);
      }
    };

    getUserInfo();
  }, [session]);
  return (
    <div className="w-full flex justify-end z-50">
      {session ? (
        <div
          className={`flex items-center max-h-10 gap-[1px] bg-customBlack py-1 px-1 rounded-full ${
            border ? "border-[1px] border-gray-600" : ""
          }`}
        >
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="bg-cover bg-center w-8 h-8 rounded-full"
          ></div>
          <div>
            <div className="dropdown h-9">
              <label className="" tabIndex="0">
                <img
                  src={"/hamburger.svg"}
                  className="w-10 cursor-pointer select-none"
                  draggable={false}
                />
              </label>
              <div
                className={`dropdown-menu bg-customBlack w-[150px] mt-1 ${
                  border ? "border-[1px] border-gray-600" : ""
                }`}
              >
                <a className="dropdown-item text-sm" href="/dashboard">
                  Dashboard
                </a>
                <Link
                  tabIndex="-1"
                  className="dropdown-item text-sm"
                  href={{
                    pathname: `/create`,
                    query: {
                      step: "one",
                    },
                  }}
                >
                  Create a Post
                </Link>
                <Link
                  tabIndex="-1"
                  className="dropdown-item text-sm text-red-500"
                  href="/"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => {
              router.push("/login");
            }}
            className=" border-[1px] border-white px-3 py-1 rounded-md"
          >
            Log in
          </button>
          <button
            onClick={() => {
              router.push("/register");
            }}
            className=" border-[1px] border-white px-3 py-1 rounded-md"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}
