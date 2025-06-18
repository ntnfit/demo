"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /examples/all immediately
    router.push("/examples/all");
  }, [router]);

  return (
    <main>
      <div>Redirecting...</div>
    </main>
  );
};

export default Home;
