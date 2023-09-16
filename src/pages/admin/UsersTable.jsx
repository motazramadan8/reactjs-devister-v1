import React, { useEffect } from "react";
import AdminSidebr from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getAllProfiles } from "../../redux/APIs/profileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [isProfileDeleted]);

   // Delete Account Handler
   const deleteAccountHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Profile",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(userId))
        swal("Account Has Been Deleted Successfully", {
          icon: "success",
        });
        window.location.reload()
      }
    });
  };

  return (
    <>
      <section className="table-container">
        <AdminSidebr />
        <div className="table-wrapper">
          <h1 className="table-title">Users</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Count</th>
                <th>Users</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr key={profile?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={profile.profilePhoto?.url}
                        alt="user"
                        className="table-user-image"
                      />
                      <span className="table-username">{profile.username}</span>
                    </div>
                  </td>
                  <td>{profile.email}</td>
                  <td>
                    <div className="table-button-group">
                      <button className="view-btn">
                        <Link to={`/profile/${profile._id}`}>View Profile</Link>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteAccountHandler(profile._id)}
                      >
                        Delete User
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UsersTable;
