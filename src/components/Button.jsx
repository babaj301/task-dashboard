const Button = ({ text, logo }) => {
  return (
    <div>
      <button
        className="w-full flex items-center justify-center gap-4 py-4 px-6 rounded-lg mb-6 border border-[#D0D5DD] font-semibold text-[#344054] text-base"
        type="submit"
      >
        <img src={logo} alt="" />
        {text}
      </button>
    </div>
  );
};

export default Button;
