import React, { useEffect} from "react";
import { useMovies} from "../../hooks";
import MovieListItem from "../MovieListItem";
import NextAndPrevButton from "../NextAndPrevButton";
import SideBar from "./SideBar";
import Table from "./Table";

const limit = 100;
let currentPageNo = 0;

export default function Movies() {
  const {
    fetchMovies,
    fetchPrevPage,
    fetchNextPage,
    movies: newMovies,
  } = useMovies();

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <SideBar>
      <h2 className='text-xl font-bold'>Movies List</h2>
      <div className="my-6">
        <Table data={newMovies}/>
        </div>
      </SideBar>
    </>
  );
}
