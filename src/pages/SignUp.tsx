import Navbar from '../components/Navbar';
import SignupForm from '../containers/SignupForm';
import React from 'react';

const SignUp = () => {
  return (
    <div className="bg-[#F7F9FC] flex flex-col justify-center items-center gap-32 h-full">
      <Navbar />
      <SignupForm />
    </div>
  );
};

export default SignUp;
