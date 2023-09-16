import React from "react";
// Packeges
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Icons
import { BiHomeAlt2, BiUserCheck } from "react-icons/bi";
import { RiFilePaper2Line } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

const NavBar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav
    style={{
        clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        // marginLeft: user && "-70px",
        // marginRight: user?.isAdmin && "-50px",
      }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link to="/" onClick={() => setToggle(false)} className="nav-link">
          <BiHomeAlt2 className="icon" /> Home
        </Link>
        <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
          <RiFilePaper2Line className="icon" /> Posts
        </Link>
        {user && (
          <Link
            to="/posts/create-post"
            onClick={() => setToggle(false)}
            className="nav-link"
          >
            <IoCreateOutline className="icon" /> Create
          </Link>
        )}
        {user?.isAdmin && (
          <Link
            to="/admin-dashboard"
            onClick={() => setToggle(false)}
            className="nav-link"
          >
            <BiUserCheck className="icon" /> Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
