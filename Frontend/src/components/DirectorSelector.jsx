import React, { useState } from "react";
import { searchActor } from "../api/actor";
import { useSearch } from "../hooks";
import { renderItem } from "../utils/helper";
import Label from "./Label";
import LiveSearch from "./LiveSearch";

export default function DirectorSelector({onSelect}) {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);
  const { handleSearch,resetSearch } = useSearch();
  const handleOnChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };


  const handelOnSelect = (profile) => {
    setValue(profile.name);
    onSelect(profile)
    setProfiles([])
    resetSearch()
  };
  
  return (
    <div className="">
      <Label htmlFor="director">Director</Label>
      <LiveSearch
        name="director"
        results={profiles}
        placeholder="Search profile"
        renderItem={renderItem}
        onSelect={handelOnSelect}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}
