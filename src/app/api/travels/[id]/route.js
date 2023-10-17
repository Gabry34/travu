import connectMongoDB from "@/app/lib/mongodb";
import Travel from "@/app/models/travel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newCity: city,
    newState: state,
    newStartDate: startDate,
    newEndDate: endDate,
    newImages: images,
    newDescription: description,
    newTravelPrice: travelPrice,
    newDaysDescriptions: daysDescriptions,
  } = await request.json();
  await connectMongoDB();
  await Travel.findByIdAndUpdate(id, {
    title,
    city,
    state,
    startDate,
    endDate,
    images,
    description,
    travelPrice,
    daysDescriptions,
  });
  return NextResponse.json({ message: "Travel updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const travel = await Travel.findOne({ _id: id });
  return NextResponse.json({ travel }, { status: 200 });
}
