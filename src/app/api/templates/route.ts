import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, config, data, isPublic, startDate } = await req.json();

  const template = await prisma.template.create({
    data: {
      name,
      config,
      data,
      isPublic,
      startDate: startDate ? new Date(startDate) : new Date(),
      userId: (session.user as any).id,
    },
  });

  return NextResponse.json(template);
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const templates = await prisma.template.findMany({
    where: {
      userId: (session.user as any).id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(templates);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, name, config, data, isPublic, startDate } = await req.json();

  const template = await prisma.template.update({
    where: {
      id,
      userId: (session.user as any).id,
    },
    data: {
      name,
      config,
      data,
      isPublic,
      startDate: startDate ? new Date(startDate) : new Date(),
    },
  });

  return NextResponse.json(template);
}
