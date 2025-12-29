import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store?.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
      // console.log(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1> No connections</h1>;
  return (
    <>
      <h1 className="text-center mt-3 text-2xl font-bold">Connections</h1>
      <div className="flex justify-center">
        <ul className="list bg-base-100 rounded-box shadow-md">
          {connections.map((c) => (
            <li key={c?._id} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={c?.photoUrl}
                  alt="profile"
                />
              </div>

              <div>
                <div className="font-semibold">
                  {c?.firstName} {c?.lastName}
                </div>
                <div className="text-xs uppercase opacity-60">
                  {c?.about || "No bio"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Connections;
