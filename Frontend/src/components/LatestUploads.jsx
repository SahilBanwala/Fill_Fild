import React, { useEffect } from "react";
import { useMovies } from "../hooks";
import MovieListItem from "./MovieListItem";

export default function LatestUploads() {
  const { fetchLatestUploads, latestUploads } = useMovies();

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  const handleUIUpdate = () => fetchLatestUploads();

  return (
    <>
      <div className="bg-transparent shadow border border-[#e2e8f0] p-5 rounded col-span-12">
        <h1 className="font-semibold text-2xl mb-2 text-white">
          Recent Uploads
        </h1>

        <div className="space-y-3">
          {latestUploads.map((movie) => {
            return (
              <MovieListItem
                afterDelete={handleUIUpdate}
                afterUpdate={handleUIUpdate}
                key={movie.id}
                movie={movie}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
