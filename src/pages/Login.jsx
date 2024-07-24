import { useState } from "react";
import "../assets/css/Login.css";
import buddy from "../assets/img/buddy.png";
import imglogin from "../assets/img/login.png";
import axios from "axios";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ToolsCookies = new Cookies();
const MySwal = withReactContent(Swal);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const login = async () => {
    let config = {
      url: "https://64532ddfe9ac46cedf1ede09.mockapi.io/Users",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let getDataUsers = await axios(config);
      let dataUsers = getDataUsers.data;
      let matchedUser = dataUsers.find((user) => user.email === email && user.password === password);

      if (!matchedUser) {
        MySwal.fire({
          title: "Upps",
          text: "Email atau password anda salah",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        var currentData = new Date();
        var expiresDate = new Date(currentData.getTime() + 60000 * 60 * 24 * 30);
        ToolsCookies.set("status_login", true, { expires: expiresDate });
        ToolsCookies.set("user_data", JSON.stringify(matchedUser), {
          expires: expiresDate,
        });
        if (matchedUser.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      MySwal.fire({
        title: "Error",
        text: "Terjadi kesalahan pada server. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="body">
      <div className="container">
        <section className="container-x1">
          <div className="row">
            <div className="col-sm-12 col-md-6 kiri">
              <div className="row align-items-center">
                <img src={imglogin} alt="Login Illustration" />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 kanan">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="buddy">
                    <img src={buddy} alt="Buddy Logo" style={{ width: "70px" }} />
                    <span className="buddy-text fs-6">Buddy</span>
                  </div>
                  <div className="judul">
                    <h1>Masuk</h1>
                    <p>
                      Belum punya akun? <NavLink to="/register">Daftar, yuk!</NavLink>
                    </p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kata Sandi</label>
                    <div className="input-group mb-3">
                      <input type={visible ? "text" : "password"} className="input form-control" id="password" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <span className="input-group-text" onClick={() => setVisible(!visible)}>
                        <i className={visible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <button id="login-btn" onClick={login} className="btn btn-primary">
                      Masuk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
