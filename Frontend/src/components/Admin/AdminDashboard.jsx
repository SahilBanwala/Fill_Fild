import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import Table from './Table'
import { useMovies, useNotification } from '../../hooks'
import { getAppInfo } from '../../api/admin'

export default function AdminDashboard() {
   
    const DashBoardData = [
        {
            bg:"bg-orange-600",
            icon:FaRegListAlt,
            title:"Total Movies",
            total:90
        },
        {
            bg:"bg-blue-700",
            icon:HiViewGridAdd,
            title:"Total Reviews",
            total:8
        },
        {
            bg:"bg-green-600",
            icon:FaUser,
            title:"Total Users",
            total:134
        },
    ]

    const [appInfo, setAppInfo] = useState({
      movieCount: 0,
      reviewCount: 0,
      userCount: 0,
    });
  
    const { updateNotification } = useNotification(); 
  
    const fetchAppInfo = async () => {
      const { appInfo, error } = await getAppInfo(); 
  
      if (error) return updateNotification("error", error);
  
      setAppInfo({ ...appInfo });
    };
  
    useEffect(() => {
      fetchAppInfo();
    }, []);

    const { fetchLatestUploads, latestUploads } = useMovies();

    useEffect(() => {
      fetchLatestUploads();
    }, []); 

  return (
    <div>

        <SideBar> 
            <h2 className='text-xl font-bold'>Dashboard</h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
            {DashBoardData.map((movie,idx) => {
          return (
            <div className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                 <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${movie.bg}`}> 
                    <movie.icon/>
                </div>
                <div className='col-span-3'>
                    <h2>{movie.title}</h2>
                    <p className='mt-2 font-bold'>{idx===0?appInfo.movieCount:idx===1?appInfo.reviewCount:appInfo.userCount}</p>
                </div>
            </div>
          );
        })}
               
             </div>
            <h3 className='text-md font-medium my-6 text-border'>Recent Movies </h3>
            <Table data={latestUploads}/>
        </SideBar>
    </div>
  )
}
