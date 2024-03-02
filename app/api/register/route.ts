import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

    await createUserWithEmailAndPassword(auth, email, password);

    await signInWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser!, {
      displayName: name,
    });

    const userRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
    });

    return NextResponse.json(
      { message: "Log In successful", email: email, addedDoc: addDoc },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
};
