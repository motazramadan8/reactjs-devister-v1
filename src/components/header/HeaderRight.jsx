import React, { useState } from "react";
// Packeges
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Icons
import { MdOutlineLogin } from "react-icons/md";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { logoutUser } from "../../redux/APIs/authApiCall";

const HeaderRight = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutUserHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              className="header-right-username"
              onClick={() => setDropdown((prev) => !prev)}
            >
              {user?.username.split(" ")[0].toString()}{" "}
              {user?.username.split(" ")[1]?.toString() === "/" || user?.username.split(" ")[1]?.toString() === "\\"
                ? user?.username.split(" ")[2]?.toString()
                : user?.username.split(" ")[1]?.toString()}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt="user"
              className="header-right-user-photo"
              onClick={() => setDropdown((prev) => !prev)}
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <AiOutlineUser />
                  <span style={{ marginLeft: "5px" }}>Profile</span>
                </Link>
                <div className="header-dropdown-item">
                  <CgLogOut />
                  <span
                    style={{ marginLeft: "5px" }}
                    onClick={logoutUserHandler}
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <MdOutlineLogin />
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <AiOutlineUserAdd />
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
