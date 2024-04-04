"use client";

import React, { useRef } from "react";
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
                <Allotment.Pane minSize={400}>
                  <Allotment>
                    <Allotment.Pane
                      snap
                      className="bg-red-500 hover:opacity-80 duration-100 transition ease-in"
                    >
                      <h2>Window 1</h2>
                    </Allotment.Pane>
                    <Allotment.Pane
                      snap
                      className="bg-green-500 hover:opacity-80 duration-100 transition ease-in"
                    >
                      <h2>Window 2</h2>
                    </Allotment.Pane>
                  </Allotment>
                </Allotment.Pane>
                <Allotment.Pane
                  className="bg-sky-500 hover:opacity-80 duration-100 transition ease-in"
                  snap
                  minSize={300}
                >
                  <h2>Window 3</h2>
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
            <Allotment.Pane snap className="bg-neutral-800">
              <span></span>
            </Allotment.Pane>
          </Allotment>
          <Allotment.Pane snap className="bg-neutral-800">
            <span></span>
          </Allotment.Pane>
        </Allotment>
      </div>
    </main>
  );
}
