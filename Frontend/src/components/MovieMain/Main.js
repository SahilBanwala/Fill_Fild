import React, {useEffect, useState } from 'react'
import MovieInfo from './MovieInfo'
import MovieCast from './MovieCast'
import { useNotification, useSearch } from '../../hooks';
import { getRelatedMovie, getSingleMovie } from '../../api/movie';
import { useParams, useSearchParams } from 'react-router-dom';
import MovieReview from './MovieReview';
import Titles from '../user/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import MovieDisplayContainer from '../user/MovieDisplayContainer';

export default function Main() {
  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState({});
  const [related, setRelated] = useState([]);
  document.body.style = 'background: #080A1A;';

  const [searchParams] = useSearchParams(); 

  const { movieId } = useParams();
  const { updateNotification } = useNotification(); 

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(searchParams.get("movieId"));
    if (error) return updateNotification("error", error); 

    setReady(true);
    setMovie(movie);
  };

  const getRelated = async () => {
    const { error, movies } = await getRelatedMovie(searchParams.get("movieId"));
    if (error) return updateNotification("error", error); 
    setRelated(movies);
  };

  useEffect(() => {
      fetchMovie();
      getRelated();
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

    <div className='bg-main'>
        <MovieInfo movie={movie}/>
        <div className='container mx-auto min-h-screen px-2 my-6'> 
        <MovieCast  cast={movie.cast}/>
        <MovieReview id={movie.id}/>
        <div className='my-16'>
        {related?.length?   <Titles title='Related Movies' Icon={BsCollectionFill}/>:""}
          <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg-grid-col'>
          {related?.length?related.map((movie,index) => {
          return <MovieDisplayContainer key={index} movie={movie}/> 
        }):""}
          </div>
        </div>
        </div>
    </div>
  )
}
