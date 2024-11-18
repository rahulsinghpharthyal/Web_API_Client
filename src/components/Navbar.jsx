import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserAction } from "../redux/actions/userAction";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { payload } = await dispatch(logoutUserAction());
      console.log(payload);
      if (payload.success) {
        toast.success(payload.message);
        navigate("/login");
      } else {
        toast.error(payload.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // useEffect(()=>{
  //   navigate('/login')
  // },[navigate])

  console.log(user);
  return (
    <nav className="bg-gray-800 shadow-xl rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-white hover:text-gray-500 inline-flex items-center border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 font-medium"
              >
                Home
              </Link>
              <Link
                to="/employee-list"
                className="text-white hover:text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
              >
                Employee List
              </Link>
              <Link
                to="/create-employee"
                className="text-white hover:text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
              >
                Create Employee
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-16">
            <Link to="" className="flex-shrink-0 flex items-center">
              <Link className="h-8 w-8 text-white mb-4" to="#">
                {user.username}
              </Link>
            </Link>
            <button
              className="bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
