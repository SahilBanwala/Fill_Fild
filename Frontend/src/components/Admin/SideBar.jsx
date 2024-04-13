import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt, FaUser } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";
import { BiUser } from "react-icons/bi";

export default function SideBar({ children }) {
  const {authInfo} = useAuth() 
  const isAdmin = authInfo.profile?.role === 'admin'
  const SideLinks = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: BsFillGridFill,
    },
    {
      name: "Movies List",
      link: "/admin/movielist",
      icon: FaListAlt,
    },
    {
      name: "Add Movie",
      link: "/admin/addMovie",
      icon: RiMovie2Fill,
    },
    {
      name: "Update Movie",
      link: "/admin/updatemovie",
      icon: FaListAlt,
    },
    {
      name: "Actors",
      link: "/admin/actor",
      icon: FaUser,
    },
    {
      name: "Add Actor",
      link: "/admin/add/actor",
      icon: BiUser,
    },
  ];

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) => {
    return isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;
  };
  return (
    <div className="min-h-screen container mx-auto px-2 text-white bg-main ">
      <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
        <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
          {SideLinks.map((link, index) => {
            return (
              <NavLink to={link.link} key={index} className={Hover}>
                <link.icon />
                <p>{link.name}</p>
              </NavLink>
            );
          })}
         
         
        </div>
        
        <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
         className="col-span-6 rounded-md bg-dry border border-gray-800 p-6 ">
       {!isAdmin? <p className='text-subMain text-center mb-5'>You are Not an Admin and For you this admin pannel is only for demostration purpose. Please Login with admin account to perform actual CRUD Operation</p>:null}
          {children}
        </div>
      </div>
    </div>
  );
}
