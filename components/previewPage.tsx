"use client";
import { FileItem, Step } from "@/lib/types";
import { WebContainer } from "@webcontainer/api";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/context/contextApi";
interface PreviewFrameProps {
  files: FileItem[];
  webContainer: WebContainer | undefined;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const { url } = useContext(AppContext);

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && (
        <div className="text-center">
          {/* Beautiful Loading Animation */}
          <div className="relative mb-6">
            {/* Outer spinning ring */}
            {/* <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div> */}

            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            </div>

            {/* Orbiting dots */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-12 h-12 animate-spin"
                style={{ animationDuration: "2s" }}
              >
                <div className="absolute w-2 h-2 bg-purple-400 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
                <div
                  className="absolute w-2 h-2 bg-green-400 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute w-2 h-2 bg-pink-400 rounded-full left-0 top-1/2 transform -translate-y-1/2 animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full right-0 top-1/2 transform -translate-y-1/2 animate-bounce"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Loading text with typing animation */}
          <div className="text-lg font-medium text-gray-300 mb-2">
            <span className="inline-block animate-pulse">
              Building your preview
            </span>
            <span className="inline-block animate-bounce ml-1">.</span>
            <span
              className="inline-block animate-bounce ml-0.5"
              style={{ animationDelay: "0.2s" }}
            >
              .
            </span>
            <span
              className="inline-block animate-bounce ml-0.5"
              style={{ animationDelay: "0.4s" }}
            >
              .
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 animate-fade-in">
            Please wait while we compile your code
          </p>

          {/* Progress bar */}
        </div>
      )}
      {url && <iframe width={"100%"} height={"100%"} src={url} />}
    </div>
  );
}
