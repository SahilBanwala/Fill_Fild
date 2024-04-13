import React, { useState } from "react";
import { searchActor } from "../../api/actor";
import { useNotification, useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../LiveSearch";
import { Input } from "../MovieMain/UserInput";

export default function CastForm({onSubmit,children}) {
  const defaultCastInfo = {
    profile: {},
    roleAs: "",
    leadActor: false,
  };
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles,setProfiles] = useState([])

  const {updateNotification} = useNotification()  
  const {handleSearch,resetSearch} = useSearch()
   
  const handelOnChange = ({target}) =>{
    const {checked,name,value} = target
    if(name==='leadActor'){
      return setCastInfo({...castInfo,leadActor:checked});
    }
    setCastInfo({...castInfo,[name]:value})
  }
  const handleProfileSelect = (profile) =>{
    setCastInfo({...castInfo,profile})
  }

  const handelSubmit = () =>{
    const {  roleAs, profile } = castInfo;
    if(!profile.name) return updateNotification('error ','Cast Profile is missing')
    if(!roleAs.trim()) return updateNotification('error ','Cast Role is missing')
    onSubmit(castInfo)
    setCastInfo({...defaultCastInfo,profile:{name:''}})
    resetSearch()
    setProfiles([])
  }

   const handleProfileChange = ({target}) =>{
        const {value} = target
        const {profile} = castInfo
        profile.name = value
        setCastInfo({...castInfo, ...profile})
        handleSearch(searchActor,value,setProfiles)
   }


  const { leadActor, roleAs, profile } = castInfo;
  return (
    <>
    <div className="flex flex-col-2 gap-2 ">
      <div className="w-[50%]">
        <LiveSearch
        placeholder="Search Profile"
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange={handleProfileChange}
      />
      </div> 
      <span className="text-border font-semibold m-auto">AS</span>
      <div className="w-[50%]">
         <input
        type="text"
        placeholder="Role As"
        className={commonInputClasses + "  bg-main rounded text-border text-sm p-4 border-2"}
        name="roleAs"
        value={roleAs}
        onChange={handelOnChange}
      />
      </div>
     
     
    </div>
    <div className="w-full grid lg:grid-cols-2 gap-6 items-start mt-5">
    <button onClick={handelSubmit} type="button" className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded">
        Add Cast
      </button>
      {children}
      </div>
    </>
  );
}
