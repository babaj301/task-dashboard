import React from 'react';
import Logo from '../assets/Logo.svg';

const SideBar = ({ onTabChange, handleLogout, selectedTab }) => {
  return (
    <div className="flex flex-col min-w-60 px-10 pt-10 border  bg-white">
      {/* Logo section */}
      <div className="p-4 mb-16 ">
        <img className="w-40" src={Logo} alt="" />
      </div>

      {/* Grouped Buttons */}
      <div className="flex flex-col ">
        {/* All Tasks Button */}
        <button
          onClick={() => onTabChange('all')}
          className={`${
            selectedTab === 'all'
              ? 'bg-[#2563DC] text-white'
              : 'bg-[#EEF2FC] text-[#14367B] '
          } max-w-30 flex items-center justify-start gap-4 py-2 px-7 rounded-md  mb-6 border border-[#D0D5DD] font-semibold text-base`}
        >
          <i
            className={
              selectedTab === 'all'
                ? 'fa-solid fa-folder'
                : 'fa-regular fa-folder'
            }
          ></i>
          <span> All</span>
        </button>
        <button
          onClick={() => onTabChange('work')}
          className={`${
            selectedTab === 'work'
              ? 'bg-[#2563DC] text-white'
              : 'bg-[#EEF2FC] text-[#14367B] '
          } max-w-30 flex items-center justify-start gap-4 py-2 px-7 rounded-md  mb-6 border border-[#D0D5DD] font-semibold text-base`}
        >
          <i
            className={
              selectedTab === 'work'
                ? 'fa-solid fa-folder'
                : 'fa-regular fa-folder'
            }
          ></i>
          <span> Work</span>
        </button>
        <button
          onClick={() => onTabChange('personal')}
          className={`${
            selectedTab === 'personal'
              ? 'bg-[#2563DC] text-white'
              : 'bg-[#EEF2FC] text-[#14367B]'
          } max-w-30 flex items-center justify-start gap-4 py-2 px-7 rounded-md  mb-6 border border-[#D0D5DD] font-semibold text-base`}
        >
          <i
            className={
              selectedTab === 'personal'
                ? 'fa-solid fa-user'
                : 'fa-regular fa-user'
            }
          ></i>
          <span> Personal</span>
        </button>
      </div>

      {/* Exit button */}
      <button
        onClick={handleLogout}
        className="max-w-30 mt-auto flex items-center justify-center gap-4 py-2 px-7 rounded-md  mb-6 border border-[#D0D5DD] font-semibold text-base hover:bg-rose-500 hover:text-white"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        <span> Log Out</span>
      </button>
    </div>
  );
};

export default SideBar;
