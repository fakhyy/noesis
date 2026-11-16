import z from "zod";
import { getUser } from "@/lib/auth/server";
import { NextResponse, type NextRequest } from "next/server";
import { DrizzleQueryError, ApiError } from "@/lib/error";
import { idSchema, thoughtUpdateSchema } from "@/schemas";
import { thoughtRepository } from "@/repositories";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    let user = await getUser();
    let id = idSchema.parse((await params).id);

    let thought = await thoughtRepository.get(user.id, id);

    return NextResponse.json({
      data: thought,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(
        {
          error: error.message,
        },
        { status: error.statusCode },
      );
    } else if (error instanceof z.ZodError) {
      return Response.json(
        {
          error: error.issues[0].message,
        },
        { status: 400 },
      );
    } else if (error instanceof DrizzleQueryError) {
      return Response.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    } else {
      return Response.json(
        {
          error: "Internal server error",
        },
        { status: 500 },
      );
    }
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    let user = await getUser();
    let id = idSchema.parse((await params).id);

    let deletedThought = await thoughtRepository.delete(user.id, id);

    return NextResponse.json({
      data: deletedThought,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(
        {
          error: error.message,
        },
        { status: error.statusCode },
      );
    } else if (error instanceof z.ZodError) {
      return Response.json(
        {
          error: error.issues[0].message,
        },
        { status: 400 },
      );
    } else if (error instanceof DrizzleQueryError) {
      return Response.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    } else {
      return Response.json(
        {
          error: "Internal server error",
        },
        { status: 500 },
      );
    }
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    let user = await getUser();
    let id = idSchema.parse((await params).id);
    let data = thoughtUpdateSchema.parse(await req.json());

    if (!data.title && !data.content) {
      throw new Error("Failed to update");
    }

    let updatedThought = await thoughtRepository.update(user.id, id, data);

    return NextResponse.json({
      data: updatedThought,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(
        {
          error: error.message,
        },
        { status: error.statusCode },
      );
    } else if (error instanceof z.ZodError) {
      return Response.json(
        {
          error: error.issues[0].message,
        },
        { status: 400 },
      );
    } else if (error instanceof DrizzleQueryError) {
      return Response.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    } else {
      return Response.json(
        {
          error: "Internal server error",
        },
        { status: 500 },
      );
    }
  }
}
