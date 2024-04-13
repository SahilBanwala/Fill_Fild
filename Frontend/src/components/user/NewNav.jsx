import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useAuth } from "../../hooks";
import { AiOutlineClose } from "react-icons/ai";

export default function NewNav() {
  const { authInfo, handleLogout, isAuth } = useAuth();
  const [value, setValue] = useState("");
  
  const navigate = useNavigate()

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;
    console.log("svd")
    navigate("/search?title=" + query);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(value);
  };

  

  const handleReset = () => {
    setValue("");
    navigate("/")
    setValue("")
  };


  const hover = "hover:text-subMain transitions text-white ";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);
  return (
    <div className="bg-main shadow-md sticky top-0 z-20">
      <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center ">
        <div className="col-span-1 lg:block hidden">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-full h-[3.3rem] object-cover"
            />
          </Link>
        </div>
        <div className="col-span-3">
          <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
            
            <input
              type="text"
              placeholder="Search Movies For Here"
              value={value}
              onChange={({ target }) => setValue(target.value)}
              className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
            />
             
      {value!=""? <button
          
          type="button"
          onClick={handleReset}
          className=" text-black "
        >
          <AiOutlineClose />
        </button>
  :""}
             <button
              type="submit"
              onClick={handleOnSubmit}
              className="bg-subMain text-white w-12 flex-colo h-12 rounded"
            >
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-15 justify-between lg:flex xl:justify-evenly items-center">
          <NavLink to="/movies" className={Hover}>
            Movies
          </NavLink>
          <NavLink to="/admin/dashboard" className={Hover}>
            Admin Pannel
          </NavLink>
          {authInfo.isLoggedIn ? (
            <NavLink to="/" className="hover:text-subMain transitions text-white">
              <div className="flex">
                <div>
                  <CgUser className="w-8 h-8" />
                </div>
                <div className=" flex mx-2 justify-center items-center">
                  {authInfo.profile?.name}
                </div>
              </div>
            </NavLink>
          ) : (
            ""
          )}

          {authInfo.isLoggedIn ? (
            <NavLink to="/" onClick={handleLogout} className="hover:text-subMain transitions text-white">
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth/signin" onClick={handleLogout} className={Hover}>
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
