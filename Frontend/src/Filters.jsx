import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import genres from "./utils/genres";

const YearData = [
  { title: "Sort By Year" },
  { title: "1700-1800" },
  { title: "1800-1900" },
  { title: "1900-2000" },
  { title: "2000-2010" },
  { title: "2010-2030" },
];

const Genres = [
  { title: "Sort By Genres" },
  ...genres
];

const Type = [
  { title: "Sort By Type" },
  { title: "Film" },
  { title: "Web Series" },
  { title: "TV Show" },
];

const RatesData = [
  { title: "Sort By Rates" },
  { title: "1 Star" },
  { title: "2 Star" },
  { title: "3 Star" },
  { title: "4 Star" },
  { title: "5 Star" },
];

export default function Filters({setYearTrue,setYearArr,typeC,genresC}) {
  const [type, setType] = useState(Type[0]);
  const [year, setYear] = useState(YearData[0]);
  const [genres, setGenres] = useState(Genres[0]);
  const [rates, setRates] = useState(RatesData[0]);
 



  const handelYearChange = (e) =>{
     const {title} = e;
     const myArray = title.split("-");
     setYearArr([...myArray])
     setYearTrue(true)
  }
  const handleGenres = (e) =>{
    const {title} = e;
    genresC(title)
 }

 const handleType = (e) =>{
  const {title} = e;
  console.log(title)
  typeC(title)
}

const handelClear= (e) =>{
  genresC(null)
  typeC(null)
  setYearTrue(false)
}
 

  const Filter = [
    {
      value: type,
      onchange:handleType,
      items: Type,
    },
    {
      value: year,
      onchange: handelYearChange,
      items: YearData,
    },
    {
      value: genres,
      onchange:handleGenres,
      items: Genres,
    },

  ];
  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onchange}>
          <div className="relative">
            <Listbox.Button className="relative border-gray-800 w-full text-white  bg-main rounded-lg shadow-sm cursor-default py-4 pl-6 pr-10 text-left text-xs ">
                <span className="block truncate font-semibold">{item.value.title}
                <span className="absolute inset-y-0 right-0 flex items-center  pointer-events-none pr-2 ">
                    <FaAngleDown className="w-5 h-5" aria-hidden="true"/>
                </span>
                </span>
               
            </Listbox.Button>
            
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg mx-h-60 ring-opacity-5 overflow-auto focus:outline sm:text-sm">
               { item.items.map((items,index)=>(
                <Listbox.Option key={index} className={({active})=>`relative cursor-default select-none py-2 pl-10 pr-4 ${active ?"bg-subMain text-white":"text-main"}` } value={items}>
                {({selected})=>(
                  <>
                  <span className={`block truncated ${selected?"font-semibold":"font-normal"}`}>
                    {items.title}
                  </span>
                  {
                    selected?
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaCheck className="h-4 w-4" aria-hidden="true"/>
                    </span>:null
                  }
                  </>
                )}
                </Listbox.Option>
                
               ))}
               
              </Listbox.Options>
            </Transition>
            
          </div>
          
        </Listbox>
      ))}
       <div className="flex gap-5 items-center">
             <div onClick={handelClear} className="bg-subMain hover:text-main trasnitions text-white px-10 cursor-pointer py-3 rounded font-medium sm:text-sm text-xs">
            Clear All Filters
             </div>
           </div>
    </div>
  );
}
