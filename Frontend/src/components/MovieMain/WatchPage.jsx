import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie";
import { useNotification } from "../../hooks";
import {
  FaCloudDownloadAlt,
  FaDownload,
  FaHeart,
  FaPlay,
} from "react-icons/fa";

export default function WatchPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const [ready, setReady] = useState(false);
  const [play, setPlay] = useState(false);
  const { updateNotification } = useNotification();
  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);

    setMovie(movie);
    setReady(true);
  };

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  return (
    <div className="container mx-auto bg-dry p-6 mb-12">
      <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-600 p-6">
        <Link
          to={`/movie?movieId=` + movieId}
          className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
        >
          <BiArrowBack /> {movie?.title}
        </Link>
        <div className="flex-btn sm:w-auto w-full gap-5">
          <button className="bg-white hover:text-subMain transitions bg-opacity-30 text-white rounded px-4 py-3">
            <FaHeart />
          </button>
          <button className="bg-subMain flex-rows gap-2 hover:text-main transitions  text-white rounded font-medium px-8 py-3 text-sm">
            <FaCloudDownloadAlt /> Download
          </button>
        </div>
      </div>
      {play ? (
        <video controls className="w-full h-full rounded">
          <source src={movie.trailer} type="video/mp4" title={movie?.title} />
        </video>
      ) : (
        <div className="w-full h-full rounded-lg overflow-hidden relative ">
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
          <button onClick={(e)=>setPlay(true)} className="bg-white text-subMain flex-colo border border-subMain rounded-full px-8 w-20 h-20 font-medium  text-xl ">
            <FaPlay/> 
          </button>
          </div>
          <img src={movie?.poster} alt={movie.title} className="w-full h-full object-contain"/>
        </div>
      )}
    </div>
  );
}
