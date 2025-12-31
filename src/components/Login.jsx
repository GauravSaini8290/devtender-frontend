import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constents";
const Login = () => {
  const [emailId, setEmail] = useState("gaurav@123gmail.com");
  const [password, setPassword] = useState("Gaurav@1234");
  const [err, setErr] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (err) {
      setErr(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );

      console.error(err);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setErr(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );

      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-400 border-base-300 rounded-box w-xs border p-4 ">
        <legend className="fieldset-legend">
          {signUp ? "SignUp" : "Login"}
        </legend>

        {signUp && (
          <>
            <label className="label">FirstName</label>
            <input
              type="text"
              className="input"
              placeholder="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">lastName</label>
            <input
              type="text"
              className="input"
              placeholder="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="text"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="text-red-500">{err}</p>
        <p
          className="text-green-500 cursor-pointer"
          onClick={() => {
            setSignUp((value) => !value);
            setErr("");
          }}
        >
          {signUp ? "existing user : login here" : "New user : signUp here"}
        </p>
        <button
          className="btn btn-neutral mt-4 hover:bg-base-300"
          onClick={signUp ? handleSignUp : handleLogin}
        >
          {signUp ? "SignUp" : "Login"}
        </button>
      </fieldset>
    </div>
  );
};
export default Login;
