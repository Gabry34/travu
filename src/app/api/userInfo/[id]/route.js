import connectMongoDB from "@/app/lib/mongodb";
import UserInfo from "@/app/models/userInfo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newImage: image,
    newBiography: biography,
    newLikedPosts: likedPosts,
  } = await request.json();
  await connectMongoDB();
  await UserInfo.findByIdAndUpdate(id, {
    image,
    biography,
    likedPosts,
  });
  return NextResponse.json({ message: "UserInfo updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const travel = await UserInfo.findOne({ _id: id });
  return NextResponse.json({ travel }, { status: 200 });
}
