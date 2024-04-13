import React, { useEffect, useState } from "react";
import Filters from "../../Filters";
import { useNotification } from "../../hooks";
import { getdMovieForUser } from "../../api/movie";
import MovieDisplayContainer from "../user/MovieDisplayContainer";

export default function MoviePage() {
  const [movie, setMovie] = useState([]);
  const updateNotification = useNotification();

  const fetchLatestUploads = async () => {
    const { error, movies } = await getdMovieForUser({yearTrue:yearTrue,yearArr:yearArr,genres:genresTrue,type:typeTrue});
    if (error) return updateNotification("error", error);
    setMovie([...movies]);
    
    console.log(movie);
  };  

  const [typeTrue, setTypeTrue] = useState(null);
  const [yearTrue, setYearTrue] = useState(false);
  const [genresTrue, setGenresTrue] = useState(null);
  const [ratesTrue, setRatesTrue] = useState(false);

  const [yearArr, setYearArr] = useState([]);

  useEffect(() => {
    fetchLatestUploads();
  }, [yearArr,genresTrue,typeTrue]);
  return (
    <div className="min-height-screen container mx-auto px-2 my-6 ">
      <Filters setYearTrue={setYearTrue} setYearArr={setYearArr} genresC={setGenresTrue} typeC={setTypeTrue} />
      <p className="text-lg font-medium my-6 lg:px-5">
        Total <span className="font-bold text-subMain">{movie.length}</span>{" "} Items Found
      </p>
      <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6 lg:px-5">
                
          {movie.map((movie,idx)=>{
            return <><MovieDisplayContainer movie={movie}/></>
         } )
        }
      </div>
    </div>
  );
}
