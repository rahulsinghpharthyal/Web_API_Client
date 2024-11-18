import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUserAction } from "../redux/actions/userAction";
import { toast } from "react-toastify";

const SignUp = () => {
  const [regiterForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.user);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { payload } = await dispatch(createUserAction(regiterForm));
      console.log(payload);
      if (payload.success) {
        toast.success(payload?.message);
        navigate('/');
      }
    } catch (error) {
      toast.error(message || error.message);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  return (
    <div className="h-full flex items-center justify-center mt-40">
      <div className="p-4 w-2/6 bg-gray-800 rounded">
        <form onSubmit={handleFormSubmit}>
          <div className="text-2xl font-semibold my-2 text-white">SignUp</div>
          <input
            type="username"
            name="username"
            placeholder="Enter username"
            onChange={onHandleChange}
            required
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={onHandleChange}
            required
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
         
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={onHandleChange}
            required
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-3 py-2 my-3 rounded bg-orange-500 text-gray-900 font-semibold text-xl"
            >
              Sign-Up
            </button>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-400">
              If you have already an account{" "}
              <Link to="/" className="text-blue-300 underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
