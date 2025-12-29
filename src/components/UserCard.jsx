import React from "react";

const UserCard = ({ users }) => {
  if (!users) return null;
  const { firstName, lastName, age, gender, photoUrl, about } = users;
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
          <button className="btn btn-primary">ignore</button>
          <button className="btn btn-secondary">interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
