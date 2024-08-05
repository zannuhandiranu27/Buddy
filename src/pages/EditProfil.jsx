import { useDispatch, useSelector } from "react-redux";
import "../assets/css/editProfile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById, updateUser, verifyOldPassword } from "../redux/reducer/userReducer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function EditProfil() {
  const userData = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState({ ...userData });
  const [showModal, setShowModal] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = (e) => {
    setUpdatedUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswords((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    MySwal.fire({
      title: "Are you sure you want to edit your profile?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateUser(userData.id, updatedUser))
          .then(() => {
            MySwal.fire("Edited!", "Your profile has been updated.", "success").then(() => navigate("/profile"));
          })
          .catch((err) => {
            MySwal.fire("Error", "There was an error updating your profile", "error");
          });
      }
    });
  };

  const handlePasswordSubmit = async () => {
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      MySwal.fire("Error", "All password fields are required", "error");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      MySwal.fire("Error", "New password and confirm password do not match", "error");
      return;
    }

    const isOldPasswordValid = await dispatch(verifyOldPassword(userData.id, passwords.oldPassword));
    if (!isOldPasswordValid) {
      MySwal.fire("Error", "Old password is incorrect", "error");
      return;
    }

    dispatch(updateUser(userData.id, { password: passwords.newPassword }))
      .then(() => {
        MySwal.fire("Success", "Your password has been updated", "success");
        setShowModal(false);
      })
      .catch(() => {
        MySwal.fire("Error", "There was an error updating your password", "error");
      });
  };

  useEffect(() => {
    if (userData.id) {
      dispatch(getUserById(userData.id));
    }
  }, [dispatch, userData.id]);

  return (
    <>
      <main>
        <Navbar />
        <section>
          <div className="container-fluid">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-3 col-md-3 col-sm-6 mb-5">
                <div className="card-edit-profile">
                  <div className="profile-container">
                    <div className="position-relative">
                      <img className="profile-img mt-3" src={updatedUser.image || ""} alt="Profile Picture" />
                    </div>
                    <h5 className="mt-3">{updatedUser.fullname}</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="box-form">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 mt-3">
                      <h3>Edit Profile</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control mt-2" name="username" value={updatedUser.username} onChange={handleChange} readOnly />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control mt-2" name="email" value={updatedUser.email} onChange={handleChange} readOnly />
                      </div>
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control mt-2" name="firstname" value={updatedUser.firstname} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control mt-2" name="lastname" value={updatedUser.lastname} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Url Image</label>
                        <input type="text" className="form-control mt-2" name="image" value={updatedUser.image} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control mt-2" name="fullname" value={updatedUser.fullname} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control mt-2" name="phoneNumber" value={updatedUser.phoneNumber} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control mt-2" name="borndate" value={updatedUser.borndate} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <div className="d-flex align-items-center">
                          <input type="password" className="form-control mt-2" name="password" value={"**********"} onChange={() => {}} readOnly style={{ pointerEvents: "none" }} />
                          <button className="btn btn-secondary ml-2 mt-2" onClick={() => setShowModal(true)}>
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row pb-4">
                    <div className="col-md-12">
                      <button className="btn btn-primary" onClick={handleSubmit}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3>Change Password</h3>
            <div className="form-group">
              <label>Old Password</label>
              <input type="password" className="form-control mt-2" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control mt-2" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control mt-2" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} />
            </div>
            <button className="btn btn-primary mt-3" onClick={handlePasswordSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfil;
