import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4">
      <div className="md:w-1/2 w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <form onSubmit={submitHandler} className="w-full">
          <div className="my-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer w-full my-4"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">
            New Customer? {" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-pink-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt="Login Illustration"
          className="w-full h-auto max-h-[600px] object-cover rounded-lg md:block hidden"
        />
      </div>
    </div>
  );
};

export default Login;
