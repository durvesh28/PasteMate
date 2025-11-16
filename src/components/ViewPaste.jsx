import React from 'react'
// import  {useState } from 'react'
import { useParams } from 'react-router-dom';
// import { addToPastes, updateToPastes } from '../redux/pasteSlice';
 import {  useSelector } from 'react-redux';
// import { useEffect } from 'react';

const ViewPaste = () => {

   const {id} = useParams();
   const allpastes = useSelector((state) => state.paste.pastes );
   const paste = allpastes.filter((p) => p._id === id)[0];

  return (
    <div>
    <div className='flex flex-row gap-8 place-content-between'>
    <input 
      className='p-3 rounded-2xl mt-2 w-[65%] pl-5'
      type='text'
      disabled
      placeholder='Enter your Title here '
      value = {paste.title}
      onChange={(e) => setTitle(e.target.value)}
    />

    {/* <button className='p-3 rounded-2xl mt-2'
        onClick={createPaste}     >
      {
        pasteId ? "Update Paste" : "Create MY Paste "
      }
    </button> */}
  </div>
  <div className='mt-8'>
    <textarea
      className='rounded-2xl min-w-[600px] p-4'
      value = {paste.content}
      disabled
      placeholder='Enter Content '
      onChange= { (e) => setValue (e.target.value ) }
      rows={30}
     />
  </div>
  </div>
  )
}

export default ViewPaste
