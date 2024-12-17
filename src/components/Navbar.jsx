import NavLogo from '../assets/Logo.svg';

const Navbar = () => {
  return (
    <nav className="border-b w-full border-[#2563DC] py-5 flex justify-center items-center">
      <img src={NavLogo} alt="" />
    </nav>
  );
};

export default Navbar;
