import React from "react";

export default function Selector({ name, options, value, label, onChange }) {
  return (
    <select
      className="border-2 bg-gray-900 text-white  border-light-subtle focus:border-white p-1 pr-10 outline-none transition rounded bg-transparent"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option className="bg-gray-900" value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option className="bg-gray-900" key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
}
