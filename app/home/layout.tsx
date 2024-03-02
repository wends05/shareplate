"use client";
import React from "react";
import { useAuthContext } from "../providers";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <RotatingLines />
      ) : !user ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1>Not logged in</h1>
          <Button>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

export default Layout;
