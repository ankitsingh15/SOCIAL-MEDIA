import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";
import "./UpdateProfile.scss";
import dummyuserImg from "../../assets/user.png";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setName(myProfile?.name || ``);
    setBio(myProfile?.bio || ``);
    setUserImg(myProfile?.avatar?.url);
  }, [myProfile]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  }
  function handleSubmit(e) {
    try {
      e.preventDefault();
      dispatch(
        updateMyProfile({
          name,
          bio,
          userImg,
        })
      );
      console.log("userImg at dispatch", userImg);
    } catch (e) {}
  }

  return (
    <div className="updateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-Img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : dummyuserImg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              value={bio}
              placeholder="Your Bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />

            <input
              type="submit"
              className="btn-primary"
              onClick={handleSubmit}
            />
          </form>
          <button className="delete-account btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
