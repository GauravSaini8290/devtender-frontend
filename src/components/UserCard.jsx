import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constents";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ users }) => {
  const dispatch = useDispatch();
  const handleSend = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeed(userId));
  };
  if (!users) return null;
  const { _id, firstName, lastName, age, gender, photoUrl, about } = users;
  
  return (
    <div className="card bg-red-800 w-72 shadow-sm font-bold ">
      <figure>
        {photoUrl && (
          <img src={photoUrl} alt="Shoes" className="rounded-lg mt-4 " />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <span>Gender : {gender}</span>
        <span>age : {age}</span>

        <p>{about}</p>

        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSend("ignore", _id)}
          >
            ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSend("interested", _id)}
          >
            interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
