import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-center items-center gap-8 p-6 bg-white w-full shadow-md sticky top-0 z-50 transition-all duration-300 ease-in-out hover:shadow-xl rounded-b-3xl border-style: solid border-gray-300">
      <NavLink
        to="/"
        className="text-lg font-semibold py-3 px-6 rounded-2xl transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg active:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className="text-lg font-semibold py-3 px-6 rounded-2xl transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg active:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
