import { useState } from "react";
import "../assets/css/Login.css";
import buddy from "../assets/img/buddy.png";
import imglogin from "../assets/img/login.png";
import axios from "axios";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";

const ToolsCookies = new Cookies();

function Login() {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message

  const login = async () => {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
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
      let matchedUsers = null;

      for (let i = 0; i < dataUsers.length; i++) {
        if (
          email === dataUsers[i].email &&
          password === dataUsers[i].password
        ) {
          matchedUsers = dataUsers[i];
          break;
        }
      }
      if (!matchedUsers) {
        setErrorMessage("Email atau password salah"); // Set error message
      } else {
        var currentData = new Date();
        var expiresDate = new Date(
          currentData.getTime() + 60000 * 60 * 24 * 30
        );
        ToolsCookies.set("status_login", true, { expires: expiresDate });
        ToolsCookies.set("user_data", JSON.stringify(matchedUsers), {
          expires: expiresDate,
        });
        if (matchedUsers.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <section className="container-x1">
          <div className="row">
            <div className="col-sm-12 col-md-6 kiri">
              <div className="row align-items-center">
                <img src={imglogin} alt="" />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 kanan">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="buddy">
                    <img src={buddy} alt="" style={{ width: "70px" }} />
                    <span className="buddy-text fs-6">Buddy</span>
                  </div>
                  <div className="judul">
                    <h1>Masuk</h1>
                    {errorMessage && (
                      <p className="error-message">{errorMessage}</p>
                    )}
                    <p>
                      Belum punya akun?{" "}
                      <NavLink to="/register">
                        <a>Daftar, yuk!</a>
                      </NavLink>
                    </p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Masukkan email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kata Sandi</label>
                    <div className="input-group mb-3">
                      <input
                        type={visible ? "text" : "password"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="input form-control"
                        id="password"
                        placeholder="password"
                        required="true"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                      />

                      <span
                        className="input-group-text "
                        onClick={() => setVisible(!visible)}
                      >
                        <i className="fas fa-eye" id="show_eye"></i>
                        <i className="fas fa-eye-slash d-none" id="hide_eye"></i>
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <button
                      id="login-btn"
                      onClick={login}
                      className="btn btn-primary"
                    >
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