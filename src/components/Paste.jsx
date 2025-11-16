import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt, faEdit, faShareAlt,faClipboard } from '@fortawesome/free-solid-svg-icons';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteID) {
    dispatch(removeFromPastes(pasteID));
  }

  const handleShare = (paste) => {
    const shareUrl = `${window.location.origin}/paste/${paste.id}`; // Assuming the URL structure has paste id.
    // Try to use the Web Share API for mobile and modern browsers.
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: shareUrl,
      })
        .then(() => toast.success('Shared successfully!'))
        .catch((error) => toast.error('Error sharing: ' + error));
    } else {
      // Fallback: Copy the shareable link to clipboard for unsupported browsers.
      navigator.clipboard.writeText(shareUrl)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy the link.'));
    }
  };

  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5'
        type='search'
        placeholder='Search Here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
      return (
        <div
          key={paste.id}
          className='border p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300'
        >
          <div>
            <h3 className='font-semibold text-xl text-gray-800'>{paste.title}</h3>
          </div>
          <div>
            <p className='text-gray-600'>{paste.content}</p>
          </div>
          <div className='flex flex-row gap-4 place-content-evenly mt-4'>
             <button className='hover:text-white-500 transition-colors duration-200'>
              <a
                href={`/?pasteId=${paste?._id}`}
                className=' font-style: normal  flex items-center gap-1 text-gray-700 hover:text-blue-500'
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </a>
            </button>
            <button className='hover:text-black-500 transition-colors duration-200'>
              <a href={`/pastes/${paste?._id}`} className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faEye} /> View
              </a>
            </button>
            <button
              onClick={() => handleDelete(paste?._id)}
              className='hover:text-red-500 transition-colors duration-200'
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(paste?.content);
                toast.success('Copied');
              }}
              className='hover:text-green-500 transition-colors duration-200'
            >
              <FontAwesomeIcon icon={faClipboard} /> Copy
            </button>
            <button
              aria-label='Share paste'
              onClick={() => handleShare(paste)}
              className='hover:text-purple-500 transition-colors duration-200'
            >
              <FontAwesomeIcon icon={faShareAlt} /> Share
            </button>
          </div>
          <div className='text-sm text-gray-500 mt-2'>
            {moment(paste.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
      );
      })}
     </div>
    </div>
  );
};

export default Paste;
