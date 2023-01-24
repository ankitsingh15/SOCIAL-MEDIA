import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { MdOutlineLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";

function Navbar() {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  // console.log(myProfile);
  async function handleLogoutClicked() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {}
  }

  return (
    <div className="Navbar">
      <div className="container">
        <h2
          className="banner hower-link"
          onClick={() => {
            navigate("/");
          }}
        >
          Socail Media
        </h2>
        <div className="right-side">
          <div
            className="profile hower-link"
            onClick={() => {
              navigate(`/profile/${myProfile._id}`);
            }}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hower-link" onClick={handleLogoutClicked}>
            <MdOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
