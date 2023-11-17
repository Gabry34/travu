import React, { useEffect, useState } from "react";
import Card from "@/app/components/Cards/Card";
import SkeletonCards from "@/app/components/Cards/SkeletonCards";
import { useSession } from "next-auth/react";

export default function LikedPosts() {
  const { data: session, status } = useSession();
  const [likedPosts, setLikedPosts] = useState([]);
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(false);

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
          setLikedPosts(t.likedPosts);
        });
      } catch (error) {
        console.log("Error loading userInfos: ", error);
      }
    };

    getUserInfo();
  }, [session]);

  useEffect(() => {
    const getTravels = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://travu-chi.vercel.app/api/travels", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch travels");
        }
        const data = await res.json();
        setTravels(data.travels);
        setLoading(false);
      } catch (error) {
        console.log("Error loading travels: ", error);
        setLoading(false);
      }
    };

    getTravels();
  }, [likedPosts]);

  const likedTravels = travels.filter((travel) =>
    likedPosts.includes(travel._id)
  );

  return (
    <div className="mt-10">
      <h1 className="text-3xl text-white">Liked posts</h1>
      <div className="w-full flex flex-wrap pt-10 gap-5 bg-customBlack">
        {loading ? (
          <SkeletonCards />
        ) : likedTravels.length === 0 ? (
          <div className="w-full h-[300px] flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl text-white">
              You haven&apos;t liked posts.
            </h1>
          </div>
        ) : (
          likedTravels.map((t) => (
            <div className="w-[350px] rounded-xl" key={t._id}>
              <Card travel={t} isDashboard={true} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
