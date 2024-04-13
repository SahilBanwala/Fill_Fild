import React from 'react'

export default function Titles({title,Icon}) {
  return (
    <div className='w-full flex sm:gap-8 gap-4 items-center lg:px-5 pt-5'>
        <Icon className='sm:w-6 sm:h-6 w-4 h-4 text-subMain'/>
        <h2 className='sm:text-xl font-bold text-lg text-white'>{title}</h2>
    </div>
  )
}
