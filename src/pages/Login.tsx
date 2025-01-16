import LoginForm from '../containers/LoginForm';
import Navbar from '../components/Navbar';
import React from 'react';

const Login = () => {
  return (
    <div className="bg-[#F7F9FC] flex flex-col justify-center items-center gap-32 h-full">
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default Login;
