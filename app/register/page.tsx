"use client";

import Link from "next/link";

import { UseFormReturn, useForm } from "react-hook-form";
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

import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const passwordSchema = z
  .string()
  .min(6)
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    "Password must contain at least 8 characters, including at least one letter and one number"
  );

const formSchema = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const createAccount = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser!, {
        displayName: values.name,
      });
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center align-middle justify-center min-h-screen gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createAccount)}
          className="flex flex-col gap-10 justify-center align-middle bg-neutral-300 p-2 rounded-md w-72"
        >
          <CreateFormField name="name" displayName="Name" form={form} />
          <CreateFormField name="email" displayName="Email" form={form} />
          <CreateFormField name="password" displayName="Password" form={form} />
          <CreateFormField
            name="confirmPassword"
            displayName="Confirm Password"
            form={form}
          />
          <Button type="submit">Create Account</Button>
        </form>
      </Form>
      <Button>
        <Link href="/login">Login Here</Link>
      </Button>
    </main>
  );
};

const CreateFormField = ({
  name,
  displayName,
  form,
  description,
}: {
  name: "name" | "email" | "password" | "confirmPassword";
  displayName: string;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  description?: string;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{displayName}</FormLabel>
        <FormControl>
          <Input placeholder={displayName} {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Register;
