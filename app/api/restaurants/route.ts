import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { NextResponse } from "next/server"


export const GET = async() => {
  const querySnapshot = await getDocs(collection(db, "restaurants"))


  return NextResponse.json({ data: querySnapshot.docs.map(doc => doc.data())}, {status: 200})
}