"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Home = () => {
  const nav = useRouter();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      nav.push("/login");
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-32 min-h-screen absolute bg-neutral-500 left-0">
        sidebar
      </div>
      <main className="flex items-center justify-center">
        <div>
          <h1>Welcome to</h1>
          <h2>SharePlate</h2>
        </div>
        <Button
          onClick={handleSignOut}
        >
          Log Out
        </Button>
      </main>
    </div>
  );
};

export default Home;
