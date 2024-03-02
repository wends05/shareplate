"use client";


import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebook, google } from "@/lib/firebase";
import { useCheck } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const { user, loading } = useCheck();
  const router = useRouter();

  const [error, seterror] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await signInWithEmailAndPassword(auth, data.email, data.password)
        .then((user) => {
          console.log(user.user);
          router.push("/home");
        })
        .catch((e: any) => console.log(e.message));
    },
  });

  const login = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  const googleLogIn = () => {
    signInWithPopup(auth, google).then((result) => {
      console.log(result.user);
      router.push("/home");
    });
  };

  const facebookLogIn = () => {
    signInWithPopup(auth, facebook).then((result) => {
      console.log(result.user);
      router.push("home");
    });
  };

  return (
    <main className="flex items-center flex-col min-h-screen justify-center gap-2">
      {loading ? (
        <>
          <RotatingLines />
          <p>Checking if Authenticated...</p>
        </>
      ) : user ? (
        <>
          <h1>Already Logged In</h1>
          <Button>
          <Link href="/home">Go to Home</Link>
          </Button>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <div className="flex justify-center items-center">
            <Button onClick={googleLogIn}>
              <FaGoogle />
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(login)}
              className="flex flex-col gap-10 bg-neutral-300 p-2 rounded-md w-72"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>Enter your email here</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
          <Link href="/register" className="pb-2">
            Register Here
          </Link>
          <Button>
            <Link href="/">Return to Home</Link>
          </Button>
          {isPending ? <p>Authenticating</p> : <p>{error}</p>}
        </>
      )}
    </main>
  );
};

export default Login;
