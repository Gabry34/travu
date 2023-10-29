import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";

export default function likeButton({ travelId }) {
  const { data: session } = useSession();
  const [userInfoId, setUserInfoId] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [heart, setHeart] = useState(false);

  const useremail = session?.user.email;

  useEffect(() => {
    if (likedPosts.includes(travelId)) {
      setHeart(true);
    }
  }, [likedPosts, travelId]);

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
          return t.email === useremail;
        });
        userInfo.map((t) => {
          setUserInfoId(t._id);
          setLikedPosts(t.likedPosts);
        });
      } catch (error) {
        console.log("Error loading userInfos: ", error);
      }
    };

    getUserInfo();
  }, [session]);

  const like = async (e) => {
    e.stopPropagation();
    if (likedPosts.includes(travelId)) {
      try {
        const newLikedPosts = likedPosts.filter(
          (postId) => postId !== travelId
        );

        const res = await fetch(
          `http://localhost:3000/api/userInfo/${userInfoId}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              newLikedPosts,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update userInfo");
        } else {
          setHeart(!heart);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const newLikedPosts = [...likedPosts, travelId];

        const res = await fetch(
          `http://localhost:3000/api/userInfo/${userInfoId}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              newLikedPosts,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update userInfo");
        } else {
          setHeart(!heart);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div
      onClick={(e) => {
        like(e);
      }}
      className="cursor-pointer w-fit px-1 py-1 z-20"
    >
      {heart ? <FcLike size={32} /> : <AiOutlineHeart size={32} />}
    </div>
  );
}
