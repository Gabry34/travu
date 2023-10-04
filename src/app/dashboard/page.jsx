"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function dashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  if (!session?.user.name) {
    router.push("/register");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi {session?.user.name}</p>
    </div>
  );
}
