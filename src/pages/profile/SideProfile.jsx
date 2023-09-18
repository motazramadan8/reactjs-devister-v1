import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, toggleFollowProfile } from "../../redux/APIs/profileApiCall";
import "./side-profile.css";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../../redux/APIs/randomUsersApiCall";

const SideProfile = () => {
  const { profile } = useSelector((state) => state.profile);
  const { randomProfiles } = useSelector((state) => state.randomUsers);
  const user = localStorage.getItem("userInfo");
  const { _id } = user && JSON.parse(user);
  const dispatch = useDispatch();
  const [followText, setFollowText] = useState(false)

  useEffect(() => {
    dispatch(getUserProfile(_id));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getRandomUsers());
  }, []);

  const toggleFollow = (profileId) => {
    dispatch(toggleFollowProfile(profileId))
    setFollowText(prev =>  !prev)
  }

  return (
    <>
      <div className="side-profile">
        <div className="side-profile-container">
          <div className="user-info">
            <div className="side-profile-image">
              <Link to={`/profile/${_id}`}>
                <img src={profile?.profilePhoto.url} alt="user" />
              </Link>
            </div>
            <div className="side-profile-username">
              <Link to={`/profile/${_id}`}>
                <h2>
                  {profile?.username?.length > 15
                    ? `${profile?.username.slice(0, 16)}...`
                    : profile?.username}
                </h2>
              </Link>
            </div>
            <div className="side-profile-bio">
              <p>
                {profile?.bio?.length > 10
                  ? `${profile?.bio.slice(0, 40)}...`
                  : profile?.bio?.length < 10
                  ? `${profile?.bio}`
                  : ""}
              </p>
            </div>
          </div>
          <div className="line"></div>
          {randomProfiles.slice(0, 3).map((randomProfile) => (
            <>
              {randomProfile._id !== _id && !randomProfile?.followers?.includes(_id) ? (
                <div key={randomProfile._id} className="suggestion-user">
                  <div className="suggestion-image">
                    <Link to={`profile/${randomProfile._id}`}>
                      <img src={randomProfile?.profilePhoto?.url} alt="user" />
                    </Link>
                  </div>
                  <Link to={`profile/${randomProfile._id}`}>
                    <div className="suggestion-info">
                      <div className="suggestion-username">
                        <p>{`${randomProfile?.username?.split(" ")[0]} ${
                          randomProfile?.username?.split(" ")[1] === "/" ||
                          randomProfile?.username?.split(" ")[1] === "\\"
                            ? randomProfile?.username?.split(" ")[2]
                            : ""
                        }`}</p>
                      </div>
                      <div className="suggestion-bio">
                        <p>
                          {randomProfile?.bio?.length > 10
                            ? `${randomProfile.bio.slice(0, 9)}...`
                            : !randomProfile?.bio
                            ? ""
                            : `${randomProfile.bio}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="suggestion-follow-btn">
                    <button onClick={() => toggleFollow(randomProfile?._id)}>
                      {
                        !followText ? (
                          "Follow"
                        ) : (
                          "UnFollow"
                        )
                      }
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideProfile;
