import z from "zod";
import { thoughtRepository } from "@/repositories";
import type { NextRequest } from "next/server";
import { searchQuerySchema, thoughtInsertSchema } from "@/schemas";
import { DrizzleQueryError, UnauthorizedError } from "@/lib/error";
import { getUser } from "@/lib/auth/server";
import { buildSearchQuery } from "@/lib/url";

export async function POST(req: NextRequest) {
  try {
    let user = await getUser();

    let body = req.json();
    let data = thoughtInsertSchema.parse(body);

    let thought = thoughtRepository.create({
      userId: user.id,
      ...data,
    });

    return Response.json(
      {
        data: thought,
      },
      { status: 234 },
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) {
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

export async function GET(req: NextRequest) {
  try {
    let user = await getUser();
    let query = buildThoughtQuery(req.url);

    let thoughtRecords = await thoughtRepository.list(user.id, query);

    return Response.json(
      {
        data: thoughtRecords,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) {
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

function buildThoughtQuery(urlSearchQuery: string) {
  try {
    let rawQuery = buildSearchQuery(urlSearchQuery);
    let query = searchQuerySchema.parse(rawQuery);
    return {
      ...query,
      page: query.page - 1,
    };
  } catch {
    return {
      page: 0,
      limit: 5,
    };
  }
}
