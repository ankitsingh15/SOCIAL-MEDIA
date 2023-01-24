import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import Avatar from "../avatar/Avatar";
import "./Followers.scss";

function Follower({ user }) {
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (feedData.followings.find((item) => item._id === user._id)) {
    //   setIsFollowing(true);
    // } else {
    //   setIsFollowing(false);
    // }
    // OR
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);

  function handleUserFollow() {
    dispatch(followAndUnfollowUser({ userIdToFollow: user._id }));
  }
  const navigate = useNavigate();
  return (
    <div className="Follower">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>

      <h5 className="hower-link follow-link " onClick={handleUserFollow}>
        {isFollowing ? "UnFollow" : "Follow"}
      </h5>
    </div>
  );
}

export default Follower;
