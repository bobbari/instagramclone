import React, { useContext } from "react";
import "./Profile.styles.css";
// user context
import { UserContext } from "../../context/user/user.provider";

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  console.log("userState", userDetails);
  return (
    <div>
      <div style={{ borderBottom: "1px solid grey" }}>
        <div className="profile_container">
          <div className="profile_image_container">
            <img
              width="120vw"
              height="115vh"
              src="https://images.vexels.com/media/users/3/147102/isolated/preview/082213cb0f9eabb7e6715f59ef7d322a-instagram-profile-icon-by-vexels.png"
              alt="profile image"
            />
          </div>
          <div className="profile_detail_container">
            <div className="profile_inner">
              <h5>Mahendra nath</h5>
              <button className="btn waves-effect waves-light">
                Edit Profile
              </button>
              <i className="material-icons"></i>
            </div>
            <div className="profile_status">
              <div>80 posts</div>
              <div>280 followers</div>
              <div>800 following</div>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80"
          alt=""
        />
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          alt=""
        />
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="imageStyle"
          src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Profile;
