import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { inputSchema } from "@/app/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const startTime = process.hrtime(); // Start the timer
    const elapsed = process.hrtime(startTime);
    const body = await req.json();

    // Validate the input
    const { username } = inputSchema.parse(body);

    if (!username) {
      console.log("Username is required");
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const data = await db.user.create({
      data: {
        username,
      },
    });

    console.log(data);
    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
    return NextResponse.json({ message: data, ms: responseTimeInMs }, { status: 200 });
  } catch (error: any) {

    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const startTime = process.hrtime(); // Start the timer
    const elapsed = process.hrtime(startTime);
    const users = await db.user.findMany();

    if (!users) {
      console.log("No users found");
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
    return NextResponse.json({ message: users, ms: responseTimeInMs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const startTime = process.hrtime(); // Start the timer
    const elapsed = process.hrtime(startTime);
    const body = await req.json();

    // Validate the input
    const { username } = inputSchema.parse(body);

    if (!username) {
      console.log("Username is required");
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        username: username as string,
      },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await db.user.delete({
      where: {
        username: username as string,
      },
    });

    console.log(data);
    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
    return NextResponse.json({ message: "User deleted", ms: responseTimeInMs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const startTime = process.hrtime(); // Start the timer
    const elapsed = process.hrtime(startTime);
    const body = await req.json();

    // Validate the input
    const { username, newUsername } = inputSchema.parse(body);

    if (!username || !newUsername) {
      console.log("Username / NewUsername is required");
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        username: username as string,
      },
    });
    
        if (!user) {
          console.log("User not found");
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

    const userExists = await db.user.findFirst({
      where: {
        username: newUsername as string,
      },
    });

    if (userExists) {
      console.log("User already exists");
      return NextResponse.json({ error: "New username already exists" }, { status: 400 })
    }

    const data = await db.user.update({
      where: {
        username: username as string,
      },
      data: {
        username: newUsername as string,
      },
    });

    console.log(data);
    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
    return NextResponse.json({ message: "User updated", ms: responseTimeInMs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}