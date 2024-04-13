import React, { useEffect, useState } from "react";
import { BsCollectionFill } from "react-icons/bs";
import Titles from "./Titles";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieDisplayContainer from "./MovieDisplayContainer";

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [shows, setShows] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies();
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  const fetchTv = async () => {
    const { error, movies } = await getTopRatedMovies("TV Series");
    if (error) return updateNotification("error", error);

    setShows([...movies]);
  };

  const fetchSeries = async () => {
    const { error, movies } = await getTopRatedMovies("Web Series");
    if (error) return updateNotification("error", error);

    setSeries([...movies]);
  };

  useEffect(() => {
    fetchMovies();
    fetchTv();
    fetchSeries();
  }, []);
  return (
    <div className="">
     { movies.length ? <div className="mt-5" >
        <Titles title="Popular Movies" Icon={BsCollectionFill} />
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 lg:px-5 ">
        {movies.map((movie,index) => {
          return <MovieDisplayContainer key={index} movie={movie}/> ;
        })}
        </div>
      </div>:""}
     { series.length ? <div className="mt-5">
        <Titles title="Popular Web Series" Icon={BsCollectionFill} />
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 lg:px-5  ">
        {series.map((movie,index) => {
          return <MovieDisplayContainer key={index} movie={movie}/> ;
        })}
        </div>
      </div>:""}
    { shows.length ? <div className="mt-5">
        <Titles title="Popular TV Shows" Icon={BsCollectionFill} />
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 lg:px-5  ">
        {shows.map((movie,index) => {
          return <MovieDisplayContainer key={index} movie={movie}/> ;
        })}
        </div>
      </div>:""}
    </div>
  );
}
