"use client";
import { insertIntoDb } from "../actions/actions";
import { useState, useEffect } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetch("/", { signal }).then(() => {
  //     console.log("Fetched");
  //   })

  //   return () => {
  //     controller.abort();
  //   }
  // }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    document.addEventListener("click", () => {
      console.log("Clicked");
    }, { signal });

    return () => {
      controller.abort();
    }
  }, [count]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    document.addEventListener("drag", () => {}, { signal });
    document.addEventListener("dragend", () => {}, { signal });
    document.addEventListener("dragstart", () => {}, { signal });
    document.addEventListener("dragover", () => {}, { signal });

    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div className="flex gap-2 m-2">
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <button
        style={{ all: "revert" }}
        onClick={async () => {
          console.log(await insertIntoDb())
        }}
      >
        Insert DB Data
      </button>
    </div>
  );
}
