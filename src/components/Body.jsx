import React from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Body = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const FetchUser = async () => {
    try {
      //fetch user from api
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      })
      dispatch(addUser(res?.data));
      if (user) {
        Navigate("/");
      }
    } catch (err) {
      if (err?.status === 401) {
        Navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
