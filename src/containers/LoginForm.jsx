import { useState } from 'react';
import Header from '../components/Header';
import RememberSection from '../components/RememberSection';
import Button from '../components/Button';
import SlashIcon from '../assets/not-slashed.svg';
import Eye from '../assets/eye.svg';
import MessageIcon from '../assets/message.svg';
import Google from '../assets/icons8-google.svg';
import Twitter from '../assets/icons8-twitter.svg';
import AccountSection from '../components/AccountSection';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { auth, googleProvider } from '../firebase';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eye, setEye] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const db = {
    email,
    password,
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setVerified(false);
    } else if (emailRegex && password.length < 1) {
      setVerified(false);
    } else if (emailRegex.test(email) && password) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setVerified(false);
    } else if (emailRegex && password.length < 2) {
      setVerified(false);
    } else if (emailRegex.test(email) && password) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  };

  const changeEye = () => {
    setEye(!eye);
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter a valid email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('User Logged In:', user);
      toast.success(`Welcome back, ${user.email}!`);
      navigate('/todoApp');
    } catch (error) {
      console.error('Login Error:', error.message);
      toast.error('Login failed. Check your email or password.');
    }
  };

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Login Success:', user);
      toast.success(`Welcome ${user.displayName}!`);
      navigate('/todoApp');
    } catch (error) {
      console.error('Google Login Error:', error.message);
      toast.error('Failed to log in with Google.');
    }
  };

  return (
    <div className="m-auto flex flex-col gap-6 lg:w-[400px]">
      <Header
        heading={'Log In'}
        paragraph={'Enter your credentials to access you account'}
      />
      <Toaster />
      <form name="email" method="post" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium text-sm text-[#101928]" htmlFor="email">
            EMAIL ADDRESS
          </label>
          <div className="w-full mt-1 mb-6 flex items-center relative placeholder-[#98A2B3]">
            <input
              className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#2563DC] appearance-none outline-none shadow-md"
              id="email"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              data-testid="email"
            />
            <img className="absolute right-6" src={MessageIcon} alt="" />
          </div>
        </div>

        <div className="gap-2">
          <label
            className="font-medium text-sm text-[#101928]"
            htmlFor="password"
          >
            PASSWORD
          </label>
          <div className="w-full mt-1 mb-6 flex items-center relative placeholder-[#98A2B3]">
            <input
              className="w-full p-4 rounded-lg border border-[#D0D5DD] hover:border-[#2563DC] appearance-none outline-none shadow-md"
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              data-testid="password"
            />
            <button
              onClick={changeEye}
              className="absolute ml-2 right-6"
              type="button"
            >
              <img className="slash" src={eye ? SlashIcon : Eye} alt="" />
            </button>
          </div>
        </div>
        <RememberSection />
        <button
          className={`form-button w-full font-semibold text-base text-white py-4 px-6 rounded-lg mb-4 ${
            verified ? 'bg-[#2563DC]' : 'bg-[#2563DC] opacity-50'
          }`}
          type="submit"
          data-testid="submit"
        >
          Log into Account
        </button>
      </form>

      <div className="flex gap-2 items-center justify-center w-full mb-4">
        <hr className="flex-grow" />
        <p className="text-input-grey">OR</p>
        <hr className="flex-grow" />
      </div>
      <div className="gap-6">
        <Button
          onClick={GoogleLogin}
          logo={Google}
          text={'Continue with Google'}
        />
        <Button logo={Twitter} text={'Continue with Twitter'} />
      </div>
      <AccountSection
        text={'Don’t have an account?'}
        link={'Register'}
        where={'/signup'}
      />
    </div>
  );
};

export default LoginForm;
