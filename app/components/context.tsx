"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function SheetSide() {
  return (
    <Sheet>
      <SheetTrigger className="w-full text-center bg-slate-600">
        Click here for Context - Yash Godara
      </SheetTrigger>
      <SheetContent className="text-white overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Sumbitted by: Yash Godara</SheetTitle>
          <SheetDescription className="hover:underline">
            <Link href="https://github.com/y17godara">
              https://github.com/y17godara
            </Link>
          </SheetDescription>

          <SheetDescription>
            <ul className="list-disc gap-y-3 flex flex-col">
              <li>
                There are 3 Main Sections Window 1 (RED), Window 2 (GREEN),
                Window 3 (BLUE).
              </li>
              <li>
                Each Window has some html, css to display in which RED has form
                to delete, and create a user, GREEN has form to update a user,
                and BLUE has a button to console.log all users.
              </li>
              <li>
                All the forms are connected to the same API endpoint to perform
                the respective operations.
              </li>
              <li>
                The total number of requests made in the current session is
                displayed in the BLUE window.
              </li>
              <li>Below Each button, the response of the API is displayed.</li>
              <li>
                The code is written in React, (NextJs), Css (Tailwind CSS), and
                the API is written in NodeJs (App Router), and the database is
                MongoDB with Prisma ORM and Deployed on Vercel (Its Free).
              </li>
              <li>
                The code is written in a way that it can be easily understood
                and modified by anyone.
              </li>
              <li>
                For Input Validations I have used the Zod Schema Validation, and
                Forms are handled by React Hook Form.
              </li>
            </ul>
          </SheetDescription>

          <SheetDescription>
            PS: I enjoyed working on this project, and I hope you like it too.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
