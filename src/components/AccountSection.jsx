const AccountSection = ({ text, link, where }) => {
  return (
    <div className="flex gap-1 justify-center items-center">
      <p className="text-sm font-normal text-input-grey">{text}</p>
      <a className="text-sm font-medium text-[#2563DC]" href={where}>
        {link}
      </a>
    </div>
  );
};

export default AccountSection;
