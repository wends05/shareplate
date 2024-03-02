import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  console.log(email, password);

  try {
    await signInWithEmailAndPassword(auth, email, password).then((user)=> console.log(user.user))

    return NextResponse.json({
      messae: "Log In successful",
      email: email,
    }, {status: 200});
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
};
