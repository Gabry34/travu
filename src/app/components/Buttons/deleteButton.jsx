import React from "react";
import { useRouter } from "next/navigation";

export default function deleteButton({ id }) {
  const router = useRouter();
  const removeTravel = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/travels?id=${id}`, {
        method: "DELETE",
      });
    }
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <button
      className="w-full py-1 px-2 bg-red-500 rounded-md mt-1"
      onClick={removeTravel}
    >
      Delete
    </button>
  );
}
