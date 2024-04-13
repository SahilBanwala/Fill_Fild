import React, { useEffect, useState } from "react";
import { getLatestUploads } from "../api/movie";
import { useNotification } from "../hooks";
import  {Swiper,SwiperSlide } from "swiper/react";
import  {Autoplay } from "swiper";
import FlexMovieItems from "./FlexMovieItems";
import { Link } from "react-router-dom";


export default function () {
  const[movie, setMovie] = useState([]);
  const updateNotification = useNotification();

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return updateNotification("error", error);
    setMovie([...movies])
    console.log(movie)
    
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  
  return (
    <div className="relative w-full">
        <Swiper
        direction="vertical"
        slidesPerView={1}
        loop={true}
        speed={1000}
        modules={[ Autoplay ]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
      >
      {movie.map((movies, index) => {
        console.log()
      return  <SwiperSlide className="relative rounded overflow-hidden">
       <img src={movies.poster} alt={movies.title} className="w-full h-full object-cover" />
       <div className="absolute linear-bg xl:pl-52 sm:pl-32 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
         <h1 className=" text-white xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
         {movies.title}
           </h1>
           <div className="flex gap-5 items-center text-dryGray">
             <FlexMovieItems movie={movies}/>
           </div>
           <div className="flex gap-5 items-center">
             <Link to={`/movie?movieId=` + movies.id} className="bg-subMain hover:text-main trasnitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs">
             View
             </Link>
           </div>
       </div>
       </SwiperSlide>
      })}
      </Swiper>
    </div>
  );
}
