import connectMongoDB from "@/app/lib/mongodb";
import Travel from "@/app/models/travel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    title,
    city,
    state,
    startDate,
    endDate,
    images,
    description,
    travelPrice,
    daysDescriptions,
    duration,
    userName,
    userEmail,
    userImage,
    userId,
  } = await request.json();
  await connectMongoDB();
  await Travel.create({
    title,
    city,
    state,
    startDate,
    endDate,
    images,
    description,
    travelPrice,
    daysDescriptions,
    duration,
    userName,
    userEmail,
    userImage,
    userId,
  });
  return NextResponse.json({ message: "Travel Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const travels = await Travel.find();
  return NextResponse.json({ travels });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Travel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Travel deleted" }, { status: 200 });
}
