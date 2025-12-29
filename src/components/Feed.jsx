import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constents";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const Feed = useSelector((store) => store?.feed);
  const getFeed = async () => {
    try {
      if (Feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    Feed && (
      <div className="flex justify-center items-center my-10">
        <UserCard users={Feed[0]} />
      </div>
    )
  );
};

export default Feed;
