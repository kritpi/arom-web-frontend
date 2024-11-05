"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const jwt = localStorage.getItem("jwtToken");
  if (jwt) {
    const jwtPayload = JSON.parse(atob(jwt.split(".")[1]));
    const isExpired = jwtPayload.exp * 1000 < Date.now();

    if (isExpired) {
      router.replace("/login");
    } else {
      router.replace("/calendar");
    }
  } else {
    router.replace("/login");
  }
  return <></>;
}
