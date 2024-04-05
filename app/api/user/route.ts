// Import the database module and required functions
import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { inputSchema, updateSchema } from "@/app/lib/validation";

// Handler for HTTP POST requests
export async function POST(req: NextRequest) {
  try {
    // Start the timer for measuring response time
    const startTime = process.hrtime();
    const elapsed = process.hrtime(startTime);

    // Parse the JSON body of the request
    const body = await req.json();

    // Validate the input schema (in this case, we're checking for the presence of a username)
    const { username } = inputSchema.parse(body);

    if (!username) {
      // Log an error if username is missing and return a response with an error message
      console.log("Username is required");
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check if the user already exists in the database
    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      // If the user exists, log an error and return a response indicating that the user already exists
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // If the user doesn't exist, create a new user in the database
    const data = await db.user.create({
      data: {
        username,
      },
    });

    // Log the created user data
    console.log(data);

    // Calculate response time in milliseconds
    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;

    // Return a response with the created user data and response time
    return NextResponse.json(
      { message: data, ms: responseTimeInMs },
      { status: 200 }
    );
  } catch (error: any) {
    // If an error occurs, log the error and return a response with an error message
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler for HTTP GET requests
export async function GET() {
  try {
    // Start the timer for measuring response time
    const startTime = process.hrtime();
    const elapsed = process.hrtime(startTime);

    // Retrieve all users from the database
    const users = await db.user.findMany();

    if (!users) {
      // If no users are found, log an error and return a response indicating that no users were found
      console.log("No users found");
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    // Calculate response time in milliseconds
    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;

    // Return a response with the retrieved users and response time
    return NextResponse.json(
      { message: users, ms: responseTimeInMs },
      { status: 200 }
    );
  } catch (error: any) {
    // If an error occurs, log the error and return a response with an error message
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler for HTTP DELETE requests
export async function DELETE(req: NextRequest) {
  try {
    // Start the timer for measuring response time
    const startTime = process.hrtime();
    const elapsed = process.hrtime(startTime);

    // Parse the JSON body of the request
    const body = await req.json();

    // Validate the input schema (in this case, we're checking for the presence of a username)
    const { username } = inputSchema.parse(body);

    if (!username) {
      // If username is missing, log an error and return a response with an error message
      console.log("Username is required");
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check if the user exists in the database
    const user = await db.user.findFirst({
      where: {
        username: username as string,
      },
    });

    if (!user) {
      // If the user doesn't exist, log an error and return a response indicating that the user was not found
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If the user exists, delete the user from the database
    const data = await db.user.delete({
      where: {
        username: username as string,
      },
    });

    // Log the deletion confirmation
    console.log(data);

    // Calculate response time in milliseconds
    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;

    // Return a response indicating that the user was successfully deleted
    return NextResponse.json(
      { message: "User deleted", ms: responseTimeInMs },
      { status: 200 }
    );
  } catch (error: any) {
    // If an error occurs, log the error and return a response with an error message
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler for HTTP PUT requests
export async function PUT(req: NextRequest) {
  try {
    // Start the timer for measuring response time
    const startTime = process.hrtime();
    const elapsed = process.hrtime(startTime);

    // Parse the JSON body of the request
    const body = await req.json();

    // Validate the input schema (in this case, we're checking for the presence of both username and newUsername)
    const { username, newUsername } = updateSchema.parse(body);

    if (!username || !newUsername) {
      // If either username or newUsername is missing, log an error and return a response with an error message
      console.log("Username / NewUsername is required");
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check if the user with the specified username exists in the database
    const user = await db.user.findFirst({
      where: {
        username: username as string,
      },
    });

    if (!user) {
      // If the user doesn't exist, log an error and return a response indicating that the user was not found
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if a user with the newUsername already exists in the database
    const userWithNewUsername = await db.user.findFirst({
      where: {
        username: newUsername as string,
      },
    });

    if (userWithNewUsername) {
      // If a user with the newUsername already exists, log an error and return a response with an error message
      console.log("New username already exists");
      return NextResponse.json(
        { error: "New username already exists" },
        { status: 400 }
      );
    }

    // If all checks pass, update the username of the user in the database
    const data = await db.user.update({
      where: {
        username: username as string,
      },
      data: {
        username: newUsername as string,
      },
    });

    // Log the update confirmation
    console.log(data);

    // Calculate response time in milliseconds
    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;

    // Return a response indicating that the user was successfully updated
    return NextResponse.json(
      { message: "User updated", ms: responseTimeInMs },
      { status: 200 }
    );
  } catch (error: any) {
    // If an error occurs, log the error and return a response with an error message
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
