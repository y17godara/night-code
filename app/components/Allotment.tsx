"use client";

import React, { useRef } from "react";
import Link from "next/link";

import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function AllotmentSection() {
  return (
    <main>
      <div className={"h-screen w-screen"}>
        <Allotment vertical>
          <Allotment.Pane snap className="bg-neutral-800">
            <span></span>
          </Allotment.Pane>
          <Allotment>
            <Allotment.Pane snap className="bg-neutral-800">
              <span></span>
            </Allotment.Pane>
            <Allotment.Pane>
              <Allotment vertical snap>
                <Allotment.Pane>
                  <Allotment>
                    <Allotment.Pane
                      snap
                      className="bg-red-500 flex flex-col justify-center h-full w-full text-center items-center hover:opacity-80 duration-100 transition ease-in"
                    >
                      <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold font-mono">
                        Window 1
                      </h2>
                    </Allotment.Pane>
                    <Allotment.Pane
                      snap
                      className="bg-green-500 flex flex-col justify-center h-full w-full text-center items-center hover:opacity-80 duration-100 transition ease-in"
                    >
                      <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold font-mono">
                        Window 2
                      </h2>
                    </Allotment.Pane>
                  </Allotment>
                </Allotment.Pane>
                <Allotment.Pane
                  className="bg-sky-500 flex flex-col justify-center h-full w-full text-center items-center hover:opacity-80 duration-100 transition ease-in"
                  snap
                >
                  <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold font-mono">
                    Window 3
                  </h2>
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
            <Allotment.Pane snap className="bg-neutral-800">
              <span></span>
            </Allotment.Pane>
          </Allotment>
          <Allotment.Pane snap className="bg-neutral-800">
            <div className="flex flex-col w-full justify-center text-center text-slate-300 p-10">
              <h2>
                NextJs 14 + TailwindCSS 3 +{" "}
                <Link
                  href={"https://www.npmjs.com/package/allotment"}
                  className="underline duration-100 transition ease-in hover:text-white hover:underline-offset-2"
                  target="_blank"
                >
                  {" "}
                  Allotment
                </Link>
              </h2>
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </main>
  );
}
