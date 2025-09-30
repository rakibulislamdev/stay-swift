import { userModel } from "@/models/user-model";
import dbConnect from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { fname, lname, email, password } = await request.json();
  await dbConnect();

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password: hashedPassword,
  };

  try {
    await userModel.create(newUser);
    return new NextResponse("User Registered Successfully", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
