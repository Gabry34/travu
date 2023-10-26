import connectMongoDB from "@/app/lib/mongodb";
import UserInfo from "@/app/models/userInfo";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, image, biography, likedPosts } = await request.json();
  await connectMongoDB();
  await UserInfo.create({
    email,
    image,
    biography,
    likedPosts,
  });
  return NextResponse.json({ message: "UserInfo Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const userInfo = await UserInfo.find();
  return NextResponse.json({ userInfo });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await UserInfo.findByIdAndDelete(id);
  return NextResponse.json({ message: "UserInfo deleted" }, { status: 200 });
}
