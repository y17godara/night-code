"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { UsernameForm } from "./form";
import { UsernameUpdateForm } from "./update-form";
import { UsernameDeleteForm } from "./delete-form";
import Cotext from "./context";

export default function AllotmentSection() {
  const [noOfRequests, setNoOfRequests] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const updateNoOfRequests = () => {
    setNoOfRequests(noOfRequests + 1);
  };

  const consoleLogUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user", {
        method: "GET",
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
      }

      console.log(json);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <main>
      <div className={"h-screen w-screen"}>
        <Cotext />
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
                      className="bg-red-500 flex flex-col justify-center h-full w-full text-center items-center hover:bg-red-600 duration-100 transition ease-in"
                    >
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold font-mono">
                        Window 1
                        <UsernameForm
                          updateReq={updateNoOfRequests}
                          loading={loading}
                          handleLoading={setLoading}
                        />
                        <UsernameDeleteForm
                          updateReq={updateNoOfRequests}
                          loading={loading}
                          handleLoading={setLoading}
                        />
                      </div>
                    </Allotment.Pane>
                    <Allotment.Pane
                      snap
                      className="bg-green-500 flex flex-col justify-center h-full w-full text-center items-center hover:bg-green-600 duration-100 transition ease-in"
                    >
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold font-mono">
                        Window 2
                        <UsernameUpdateForm
                          updateReq={updateNoOfRequests}
                          loading={loading}
                          handleLoading={setLoading}
                        />
                      </div>
                    </Allotment.Pane>
                  </Allotment>
                </Allotment.Pane>
                <Allotment.Pane
                  className="bg-sky-500 flex flex-col justify-center h-full w-full text-center items-center hover:bg-sky-600 duration-100 transition ease-in"
                  snap
                >
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold font-mono">
                    Window 3
                    <h3>Total No of Requests (this session): {noOfRequests}</h3>
                    <button
                      disabled={loading}
                      onClick={consoleLogUsers}
                      className="border border-2-black rounded-xl mt-10 disabled:opacity-50 hover:bg-sky-100"
                    >
                      Console.log("All Users");
                    </button>
                  </div>
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
