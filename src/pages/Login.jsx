import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserAction } from "../redux/actions/userAction";


const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, isError } = useSelector((state) => state.user);
  const from = location?.state?.from?.pathname || "/";
  
  useEffect(() => {
    if (!isLoading && user?._id) {
      return navigate(from, { replace: true });
    }
    if (!isLoading && isError) {
      toast.error(isError);
    }
  }, [isLoading, isError, navigate, user?._id, isLoading]);


  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { payload } = await dispatch(loginUserAction(loginForm));
      if (payload?.success) {
        toast.success(payload?.message);
        navigate('/dashboard');
      }else {
        alert(`Login failed: ${result.payload}`);
      }
    } catch (error) {
      toast.error(error?.resonse?.data?.message || error?.message);
    }
  };

  return (
    <div className="h-full flex items-center justify-center mt-40">
      <div className="p-4 w-2/6 bg-gray-800 rounded">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl font-semibold my-2 text-white">Login</div>
          <input
            type="username"
            name="username"
            placeholder="Enter your username"
            onChange={onHandleChange}
            required
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={onHandleChange}
            required
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-3 py-2 my-3 rounded bg-orange-500 text-white font-semibold text-xl"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-400">
              If you don't have an account{" "}
              <Link to="/sign-up" className="text-blue-300 underline">
                Sign-Up{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
