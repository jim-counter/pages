import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="container font-['Montserrat'] mb-[50px] px-4 xl:px-0 sm:mx-auto text-white rounded-xl bg-[#fafafa] dark:bg-[#1E254E] shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center text-2xl font-bold">
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="py-5 px-3 text-black hover:text-grey">
              Home
            </Link>
            <Link to="/about" className="py-5 px-3 text-black hover:text-grey">
              About
            </Link>
            <Link to="/search-rewards-csv" className="py-5 px-3 text-black hover:text-grey">
              Search Rewards
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
