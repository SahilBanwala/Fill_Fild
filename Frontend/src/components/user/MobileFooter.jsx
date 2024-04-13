import React from 'react'
import { BsCollectionPlay } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { CgUser } from 'react-icons/cg';
import { FaUserCheck } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';

export default function MobileFooter() {
    const active = "bg-white text-main";
    const inActive = "transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3 "
    const { authInfo, handleLogout, isAuth } = useAuth(); 
  const Hover = ({ isActive }) => (isActive ? `${active} ${inActive}` : inActive);
  return (
    <>
    <div className='flex-btn h-full bg-white rounded overflow-y-scroll flex-grow w-full'>

    </div>
    <footer  className='lg:hidden fixed  z-50 bottom-0 w-full px-1'>
        <div className='bg-dry rounded-md flex-btn w-full p-1'>
        <NavLink to="/movies" className={Hover}> 
            <BsCollectionPlay/>
          </NavLink>
          <NavLink to="/admin/dashboard" className={Hover}>
           <RiAdminFill/>
          </NavLink>
          {authInfo.isLoggedIn ? (
            <NavLink to="/" className="transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3" >
              <div className="flex">
                <div>
                  <CgUser className="w-8 h-8" />
                </div>
              </div>
            </NavLink>
          ) : (
            ""
          )}
          {authInfo.isLoggedIn ? (
            <NavLink to="/" onClick={handleLogout} className="transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3">
              <FaUserCheck/>
            </NavLink>
          ) : (
            <NavLink to="/auth/signin"  className="transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3">
               <FaUserCheck/>
            </NavLink>
          )}
        </div>
    </footer>
    </>
  )
}
