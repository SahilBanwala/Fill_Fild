import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowwrap px-5 py-3";



const Rows = (movie,i,handelClick) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            src={movie.poster}
            className="h-full w-full object-cover"
            alt={movie.title}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie.title}</td>
      <td className={`${Text}`}>{movie.type}</td>
      <td className={`${Text}`}>{movie.year}</td>
      <td className={`${Text}`}>{movie.duration}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.status}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        <button className="border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
         Edit <FaEdit onClick={() => handelClick({id:movie.id})} className="text-green-500"/>
        </button>
        <button className="bg-subMain text-white rounded flex-colo w-7 h-7 ">
         <MdDelete/>
        </button>
      </td>
      
    </tr>
  );
};

export default function Table({ data, admin }) {

  const navigate = useNavigate()

  const handelClick = ({id}) =>{
    navigate("/admin/updatemovie?movieId=" + id)
   }

  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Type
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Status
            </th>
            
            <th scope="col" className={`${Head} text-end`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800" >
            {data.map((movie,i)=>Rows(movie,i,handelClick))}
        </tbody>
      </table>
    </div>
  );
}
