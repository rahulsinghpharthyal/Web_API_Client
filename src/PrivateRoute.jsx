import { useState, useEffect, useLayoutEffect } from "react";
import { axiosPrivate } from "./customAxios/customAxios";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { logoutUserAction } from "./redux/actions/userAction";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
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
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/login", {state: {from: location}})
      } finally {
        setLoading(false); // Ensure loading is set to false in both success and failure cases
      }
    };
    isMounted && fetchUser();
    return () => {
      isMounted = false;
    };

  }, [navigate, location]);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
