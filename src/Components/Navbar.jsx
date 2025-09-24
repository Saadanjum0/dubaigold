import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-2 md:px-2 md:pr-3 bg-[#FFF6D6] py-2 mb-0">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/Images/newlogo.webp"
            className="w-15 h-15 md:w-20 md:h-20 object-contain"
            alt="Dubai GoldBarMaker Logo"
          />
          <div className="">
            <div className="flex flex-col">
              <div className=" ">
    <div className=" ml-6 md:ml-13 h-3 w-3 md:w-4 md:h-4">
 <img src="/Images/reg.webp"/>
                
              </div>
              <div className="-ml-2 md:ml-0 text-[13px] md:text-xl font-bold text-[#E4B02D] leading-tight">
                DUBAI
              </div>
            
              </div>
              <div className="-ml-2 md:ml-0 text-[12px] md:text-base font-semibold text-[#E4B02D]">
                Gold/Silver-BarMaker
              </div>
            </div>
          </div>
        </div>

        {/* Admin Login Button */}
        <div>
          <Link to='/login'>
            <button className="bg-yellow-300 px-4 text-[13px] text-black md:px-6 py-2.5 rounded-full md:font-medium md:text-[15px] hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              Admin Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;