import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateUser, verifyOldPassword } from "../redux/reducer/userReducer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function ChangePassword() {
  const userData = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = (e) => {
    setPasswords((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
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
        MySwal.fire("Success", "Your password has been updated", "success").then(() => navigate("/profile"));
      })
      .catch(() => {
        MySwal.fire("Error", "There was an error updating your password", "error");
      });
  };

  return (
    <>
      <main>
        <Navbar />
        <section>
          <div className="container-fluid">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-8 col-md-12">
                <div className="box-form">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 mt-3">
                      <h3>Change Password</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Old Password</label>
                        <input type="password" className="form-control mt-2" name="oldPassword" value={passwords.oldPassword} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-control mt-2" name="newPassword" value={passwords.newPassword} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" className="form-control mt-2" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} />
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
    </>
  );
}

export default ChangePassword;
