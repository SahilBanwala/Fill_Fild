import React from "react";

export default function NotFoundText({ text, visible }) {
  if (!visible) return null;
  return (
    <h1 className="font-semibold text-3xl text-white text-center py-5 ">
      {text}
    </h1>
  );
}
