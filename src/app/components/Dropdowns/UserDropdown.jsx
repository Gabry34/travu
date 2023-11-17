import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

export default function UserDropdown({ border }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState("");

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
          className={`flex items-center max-h-10 gap-[1px] border-[1px] py-1 px-1 rounded-full ${
            border ? "border-[1px] border-gray-600" : ""
          }`}
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt="image"
                layout="fill"
                objectFit="cover"
                objectPosition="center center"
                className="rounded-full"
              />
            ) : (
              <RxAvatar size={32} color="white" />
            )}
          </div>
          <div>
            <div className="dropdown h-9">
              <label className="flex justify-center mt-[5px]" tabIndex="0">
                <RxHamburgerMenu
                  size={24}
                  color="white"
                  className="mx-2 mb-2"
                />
              </label>
              <div
                className={`dropdown-menu bg-customBlack w-[150px] mt-1 ${
                  border ? "border-[1px] border-gray-600" : ""
                }`}
              >
                <a
                  className="dropdown-item text-sm text-white"
                  href="/dashboard"
                >
                  Dashboard
                </a>
                <Link
                  tabIndex="-1"
                  className="dropdown-item text-sm text-white"
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
            className=" border-[1px] border-white px-3 py-1 rounded-md text-white"
          >
            Log in
          </button>
          <button
            onClick={() => {
              router.push("/register");
            }}
            className=" border-[1px] border-white px-3 py-1 rounded-md text-white"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}
