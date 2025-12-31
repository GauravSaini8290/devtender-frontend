import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { BASE_URL } from "../utils/constents";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(
    (store) => store?.connection?.userConnections
  );
  if (!connections) return null;
  console.log(connections);

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0) return <h1> no connections </h1>;
  return (
    <>
      <h1 className="text-center mt-3 text-2xl font-bold">Connections</h1>

      {connections.map((c, index) => (
        <div   key={c?._id || index} className="flex justify-center">
          <ul
          
            className="list bg-base-300 rounded-box shadow-md mt-4 w-[500px] "
          >
            <li className="list-row w-auto flex">
              <div>
                <img className="size-10 rounded-box" src={c?.photoUrl} />
              </div>
              <div>
                <div>
                  {c?.firstName} {c?.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {c?.about}
                </div>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default Connections;
