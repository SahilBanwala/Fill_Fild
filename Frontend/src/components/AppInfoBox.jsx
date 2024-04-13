import React from "react";

export default function AppInfoBox({ title, subTitle }) {
  return (
    <div className="bg-transparent border border-[#e2e8f0] w-5/12 p-5 rounded ">
      <h1 className="font-semibold text-2xl mb-2 text-white dark:text-white">
        {title}
      </h1>
      <p className="text-xl text-white">{subTitle}</p>
    </div>
  );
}
