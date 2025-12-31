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
  // if (Feed.length === 0)
  //   return (
  //     <h1 className="text-red-500 text-center font-bold mt-4">No users</h1>
  //   );
  return (
    Feed && (
      <div className="flex justify-center items-center my-10">
        <UserCard users={Feed[0]} />
      </div>
    )
  );
};

export default Feed;
