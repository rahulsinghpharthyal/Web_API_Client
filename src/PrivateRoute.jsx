import { useState, useEffect } from "react";
import { axiosPrivate } from "./customAxios/customAxios";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { logoutUserAction } from "./redux/actions/userAction";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get("/authenticate", {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });
        // setUser(response.data.user);
        console.log(response);
        dispatch(setUser(response.data.Data));
        setLoading(false);
      } catch (error) {
        console.error("Authentication failed:", error);
        dispatch(logoutUserAction());
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
