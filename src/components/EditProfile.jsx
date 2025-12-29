import axios from "axios";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/constents";
import UserCard from "./UserCard";
const EditProfile = () => {
  const saveProfile = async () => {
    try {
      setErr("")
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
    } catch (err) {
      setErr(err?.response?.data)
      console.error(err);
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState("");
  const [about, setabout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [err, setErr] = useState("");

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">FirstName </label>
          <input
            type="text"
            className="input"
            placeholder="firstname"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <label className="label">LastName </label>
          <input
            type="text"
            className="input"
            placeholder="lastname"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />

          <label className="label">Age</label>
          <input
            type="text"
            className="input"
            placeholder="age"
            value={age}
            onChange={(e) => {
              setage(e.target.value);
            }}
          />
          <label className="label">Gender</label>
          <input
            type="text"
            className="input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
          <label className="label">About</label>
          <input
            type="text"
            className="input"
            placeholder="About"
            value={about}
            onChange={(e) => {
              setabout(e.target.value);
            }}
          />
          <label className="label">PhotoUrl</label>
          <input
            type="text"
            className="input"
            placeholder="About"
            value={photoUrl}
            onChange={(e) => {
              setPhotoUrl(e.target.value);
            }}
          />
          <p className="text-red-600 font-bold">{err}</p>
          <button className="btn btn-active btn-accent mt-2" onClick={saveProfile}>
            Update
          </button>
        </fieldset>

        <UserCard
          users={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
    </>
  );
};

export default EditProfile;
