import React from "react";
import userImage from "../../assets/user.png";
import "./Avatar.scss";
function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src ? src : userImage} alt="User Image" />
    </div>
  );
}

export default Avatar;
