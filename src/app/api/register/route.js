import connectMongoDB from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, hashedPassword, image, biography } =
    await request.json();
  await connectMongoDB();
  const user = await User.findOne({ email });

  if (!user) {
    await User.create({
      name,
      email,
      hashedPassword,
      image,
      biography,
    });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  }
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
