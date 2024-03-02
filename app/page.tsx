"use client";

import Link from "next/link";

import Header from "@/components/main/Header";
import { Button } from "@/components/ui/button";


export default function Home() {

  return (
    <main>
      <Header />
      <div className="flex pt-20 px-3 w-full items-center min-h-screen bg-neutral-400">
        <div className="flex w-1/2 p-10 flex-col">
          <div>
            <h1>Welcome to</h1>
            <h2>SharePlate</h2>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center"></div>
      </div>
      <div className="flex min-h-screen">next area</div>
    </main>
  );
}
