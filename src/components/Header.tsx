import React from 'react';

interface HeaderProps {
  heading: string;
  paragraph: string;
}

const Header = ({ heading, paragraph }: HeaderProps) => {
  return (
    <div className="text-center gap-2">
      <p className="font-semibold text-[#101928] text-2xl">{heading}</p>
      <p className="text-base font-normal text-[#667185]">{paragraph} </p>
    </div>
  );
};

export default Header;
