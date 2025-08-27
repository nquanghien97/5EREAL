import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { lat, lng, note }: { lat: number, lng: number, note: string } = await req.json()
    const userId = req.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ message: "Unauthorization" }, { status: 401 });
    }

    const existingCoordinate = await prisma.coordinates.findFirst({
      where: {
        lat,
        lng,
        userId: Number(userId)
      }
    })

    if (existingCoordinate) {
      const data = await prisma.coordinates.update({
        where: {
          id: existingCoordinate.id
        },
        data: {
          note,
        }
      })
      return NextResponse.json({ data, message: "Coordinates saved successfully" }, { status: 200 });
    }
    const data = await prisma.coordinates.create({
      data: {
        lat: Number(lat),
        lng: Number(lng),
        note,
        userId: Number(userId)
      }
    })
    return NextResponse.json({ data, message: "Coordinates saved successfully" }, { status: 200 });
  } catch (err) {
    console.log((err as Error).message)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    const data = await prisma.coordinates.findMany({
      where: {
        userId: Number(userId)
      }
    })
    return NextResponse.json({ data, message: "Get Coordinates successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}