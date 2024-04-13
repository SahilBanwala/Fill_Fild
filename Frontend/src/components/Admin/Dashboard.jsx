import React, { useState } from "react";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";
import AppSearchForm from "../form/AppSearchForm";
import { useSearch } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { handleSearch, resetSearch, resultNotFound } = useSearch();
  const [results, setResults] = useState([]);

  const navigate = useNavigate()

  const handleSearchFormReset = () => {
    resetSearch();
    setResults([]);
  };

  const handleOnSearchSubmit = (value) => {
      if(!value.trim()) return;
      navigate("/search?title=" + value)
  };

  return (
    <>
      <div className="flex justify-end mb-5">
        <AppSearchForm
          onReset={handleSearchFormReset}
          onSubmit={handleOnSearchSubmit}
          placeholder="Search Movies.."
          showResetIcon={results.length || resultNotFound}
        />
      </div>
      <div className="my-5 flex justify-around gap-5 w-full">
        <AppInfoBox title="Total Uploads" subTitle="100" />
        <AppInfoBox title="Total Reviews" subTitle="1,500" />
        <AppInfoBox title="Total Users" subTitle="200" />
      </div>
      <div className="grid grid-cols-3  my-5 ">
        <LatestUploads />
      </div>
    </>
  );
}
