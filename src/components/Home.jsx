import React, {useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteID")
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes );

    useEffect(()  => {
      console.log("inside")
      if(pasteId) {
        const paste = allPastes.find((p) => p._id === pasteId);
        console.log("page found ")
        setTitle(paste.title);
        setValue(paste.content);
      }
    },[pasteId, allPastes]);


    function createPaste() {
      const paste = {
        title: title,
        content: value,
        _id: pasteId || 
             Date.now().toString(36),
        createdAt: new Date().toISOString(),
      } 

     
      if(pasteId) {
        //Update
        dispatch(updateToPastes(paste));

      }
      else{
        //Create 
        dispatch(addToPastes(paste));
      }

      // after creation or updation 
      setTitle('');
      setValue('');
      setSearchParams({});


    }
  return (
    <div>
      <div className='flex flex-row gap-8 place-content-between'>
      <input 
        className='p-3 pl-5 rounded-2xl mt-4 w-[65%] bg-gray-100 text-gray-800 font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:bg-gray-200'
        type='text'
        placeholder='Enter your Title here '
        value = {title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className='py-3 px-6 rounded-2xl mt-4 bg-blue-600 text-black font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50'
          onClick={createPaste}     >
        {
          pasteId ? "Update Paste" : "Create MY Paste "
        }
      </button>
    </div>
    <div className='mt-8'>
      <textarea
        className='p-4 rounded-2xl min-w-[600px] bg-gray-100 text-gray-800 font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 resize-none transition-all duration-300 hover:bg-gray-200'
        value = {value}
        placeholder='Enter Content '
        onChange= { (e) => setValue (e.target.value ) }
        rows={30}
       />
    </div>
    </div>
  )
}

export default Home
