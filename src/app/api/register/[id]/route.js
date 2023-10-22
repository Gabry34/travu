import connectMongoDB from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newHashedPassword: hashedPassword,
    newImage: image,
    newSub: sub,
  } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, {
    name,
    hashedPassword,
    image,
    sub,
  });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const travel = await User.findOne({ _id: id });
  return NextResponse.json({ travel }, { status: 200 });
}
