import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

export default function FlexMovieItems({movie}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{movie.genres}</span>
      </div>
      <div className=" flex items-center gap-2">
        <div>
          <FaRegCalendarAlt className="text-subMain w-3 h-3" />
        </div>
        <div>
          <span className="text-sm font-medium">{movie?.year}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <BiTime className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">{movie?.duration}</span>
      </div>
    </>
  );
}
