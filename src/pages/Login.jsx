import LoginForm from '../containers/LoginForm';
import Navbar2 from '../components/Navbar';

const Login2 = () => {
  return (
    <div className="bg-[#F7F9FC] flex flex-col justify-center items-center gap-32 h-full">
      <Navbar2 />
      <LoginForm />
    </div>
  );
};

export default Login2;
