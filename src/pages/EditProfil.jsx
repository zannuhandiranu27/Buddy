import { useDispatch, useSelector } from "react-redux";
import "../assets/css/editProfile.css";
import ikin from "../assets/img/gambar-ikin.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, getUserById, updateUser } from "../redux/reducer/userReducer";
import Navbar from "../components/Navbar";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
function EditProfil() {
  const userData = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState({ ...userData });
  const handleChange = (e) => {
    setUpdatedUser((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    MySwal.fire({
      title: "Are you sure want to Edit your profile?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateUser(userData.id, updatedUser));
        navigate("/login");
        MySwal.fire("Edited!", "You must be logged in again to see changes", "success");
      }
    });
  };
  useEffect(() => {
    dispatch(getUserById(userData.id)); // Mengambil ulang data user setelah update
  }, [dispatch, userData.id]);
  return (
    <>
      <main>
        <Navbar />
        <section>
          <div className="container-fluid">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-3 col-md-3 col-sm-6 mb-5">
                <div className="col-lg-6">
                  <div className="card-edit-profile">
                    <div className="profile-container">
                      <div className="position-relative">
                        <img className="profile-img mt-3" src={userData.image} alt="Profile Picture" />
                      </div>
                      <h5 className="mt-3">{userData.fullname}</h5>
                    </div>
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
                        <input type="text" className="form-control mt-2" id="username" name="username" value={updatedUser.username} onChange={handleChange} readOnly />
                      </div>

                      <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control mt-2" id="email" name="email" value={updatedUser.email} onChange={handleChange} readOnly />
                      </div>
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control mt-2" id="firstname" name="firstname" value={updatedUser.firstname} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control mt-2" id="lastname" name="lastname" value={updatedUser.lastname} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Url Image</label>
                        <input type="text" className="form-control mt-2" id="image" name="image" value={updatedUser.image} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control mt-2" id="password" name="password" value={updatedUser.password} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control mt-2" id="fullname" name="fullname" value={updatedUser.fullname} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control mt-2" id="phoneNumber" name="phoneNumber" value={updatedUser.phoneNumber} onChange={handleChange} />
                      </div>

                      <div className="form-group">
                        <label>Tanggal Lahir</label>
                        <input type="date" className="form-control mt-2" id="borndate" name="borndate" defaultValue={updatedUser.borndate} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row pb-4">
                    <div className="col-md-12">
                      <button className="btn btn-primary" onClick={handleSubmit}>
                        Ubah Profile
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

export default EditProfil;
