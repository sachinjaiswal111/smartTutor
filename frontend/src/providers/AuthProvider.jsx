import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/authApi.js";
import { setUser, logout } from "../features/auth/authSlice.js";

import Loader from "../component/common/Loder.jsx";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { data, isPending } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (data?.success) {
      dispatch(setUser(data.data));
    } else {
      dispatch(logout());
    }
  }, [data, dispatch]);

  if (isPending) {
    return <Loader />;
  }

  return children;
};

export default AuthProvider;