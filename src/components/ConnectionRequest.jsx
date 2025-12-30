import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constents";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const Request = useSelector((store) => store?.request);

  const RequestReview = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!Request) return null;
  if (Request.length === 0)
    return (
      <h1 className="text-red-500 text-center font-bold mt-4"> No request </h1>
    );
  return (
    <div className="flex justify-center items-center">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {Request.map((r) => (
          <li key={r?._id} className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src={r?.senderId?.photoUrl}
                alt="profile"
              />
            </div>

            <div>
              <div className="font-semibold">
                {r?.senderId?.firstName} {r?.senderId?.lastName}
              </div>
              <div className="text-xs uppercase opacity-60">
                {r?.senderId?.about || "No bio"}
              </div>
            </div>
            <div className="flex gap-2 items-center p-6">
              <button
                className="btn bg-primary btn-outline"
                onClick={() => RequestReview("rejected", r?._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-accent"
                onClick={() => RequestReview("accepted", r?._id)}
              >
                Accept
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectionRequest;
