import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
 
export async function POST(request) {
  const body = await request.json();
  const { paramsToSign } = body;
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET);
  return NextResponse.json({ signature });
}