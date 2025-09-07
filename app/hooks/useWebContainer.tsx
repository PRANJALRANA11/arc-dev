"use client";
import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);

  useEffect(() => {
    console.log("Booting WebContainer...");

    WebContainer.boot()
      .then((instance) => {
        console.log("WebContainer instance is ready:", instance);
        setWebcontainer(instance);
      })
      .catch((err) => {
        console.error("WebContainer boot failed:", err);
      });
  }, []);

  console.log("Current webcontainer in hook:", webcontainer);

  return webcontainer;
}
