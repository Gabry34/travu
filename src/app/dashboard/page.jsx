"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi {session?.user.name}</p>
      <Link
        href="/"
        onClick={() => {
          signOut();
        }}
      >
        signout
      </Link>
    </div>
  );
}
