import React from "react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }) => {
  const router = useRouter();

  const removeTravel = async (e) => {
    e.stopPropagation();
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(
        `https://travu-psi.vercel.app/api/travels?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button
      className="w-full py-1 px-2 bg-red-500 rounded-md mt-2"
      onClick={(e) => {
        removeTravel(e);
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
