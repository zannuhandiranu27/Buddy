import signUp from "../assets/img/signUp.png";
import buddy from "../assets/img/buddy.png";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/Register.css";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const cookies = new Cookies();

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [fullname, setFullname] = useState("");

  const handleFirstnameChange = (event) => {
    const value = event.target.value;
    setFirstname(value);
    updateFullname(value, lastname);
  };

  const handleLastnameChange = (event) => {
    const value = event.target.value;
    setLastname(value);
    updateFullname(firstname, value);
  };

  const updateFullname = (first, last) => {
    const fullName = `${first} ${last}`;
    setFullname(fullName);
  };

  const register = async () => {
    let email = document.querySelector("#email").value;
    let address = document.querySelector("#address").value;
    let password = document.querySelector("#password").value;
    let phoneNumber = document.querySelector("#phoneNumber").value;

    if (firstname.length > 15) {
      MySwal.fire("Error", "Nama depan maksimal 15 karakter!", "error");
      return;
    }

    if (lastname.length > 15) {
      MySwal.fire("Error", "Nama belakang maksimal 15 karakter!", "error");
      return;
    }

    if (!email.includes("@gmail.com")) {
      MySwal.fire("Error", "Email harus mengandung '@gmail.com'!", "error");
      return;
    }

    if (!/^[0-9]+$/.test(phoneNumber) || !phoneNumber.startsWith("08") || phoneNumber.length > 13) {
      MySwal.fire("Error", "Nomor telepon harus menggunakan angka, diawali dengan 08, dan maksimal 13 karakter!", "error");
      return;
    }

    if (password.length > 15) {
      MySwal.fire("Error", "Password maksimal 15 karakter!", "error");
      return;
    }

    if (address.length > 100) {
      MySwal.fire("Error", "Alamat maksimal 100 karakter!", "error");
      return;
    }

    let config = {
      url: "https://64532ddfe9ac46cedf1ede09.mockapi.io/Users",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        fullname: fullname,
        email: email,
        address: address,
        password: password,
        phoneNumber: phoneNumber,
      }),
    };

    try {
      const response = await axios(config);
      if (response.status === 201) {
        const responseData = response.data;
        cookies.set("token", responseData.token);
        console.log("Registration success!");
        MySwal.fire({
          title: "Registrasi Berhasil!",
          text: "Anda akan diarahkan ke halaman login dalam beberapa saat.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            window.location.href = "/login";
          },
        });
      } else {
        console.log("Registration failed!");
        MySwal.fire("Error", "Registrasi gagal! Silakan coba lagi.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      MySwal.fire("Error", "Terjadi kesalahan saat registrasi!", "error");
    }
  };

  const style = {
    borderRadius: "1rem",
  };

  return (
    <>
      <div>
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <div className="">
              <Col xl={10} className="ms-lg-5">
                <Card className="ms-lg-5" style={style}>
                  <Row className="g-0">
                    <Col className="d-none d-md-block" md={6} lg={6}>
                      <Image src={signUp} style={{ margin: "40% 0px", width: "500px" }} />
                    </Col>
                    <Col className="d-flex d-md-block" md={6} lg={6} style={{ backgroundColor: "#F4F7F9" }}>
                      <Card.Body className="p-4 p-lg-5 text-black">
                        <span style={{ fontWeight: 500 }}>
                          <Image src={buddy} style={{ width: "50px" }} />
                          &nbsp; Buddy
                        </span>
                        <h2 style={{ marginTop: "20px", fontWeight: 600, fontSize: "50px" }}>Daftar</h2>
                        <p style={{ fontSize: "14px" }}>
                          Udah punya akun ?{" "}
                          <Link to="/login" className="text-decoration-none">
                            Masuk Sekarang
                          </Link>
                        </p>
                        <Form>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: "14px" }}>First Name</Form.Label>
                            <Form.Control id="firstName" style={{ fontSize: "14px", padding: "10px 12px" }} type="text" placeholder="Masukkan Nama Awal" value={firstname} onChange={handleFirstnameChange} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: "14px" }}>Last Name</Form.Label>
                            <Form.Control id="lastName" style={{ fontSize: "14px", padding: "10px 12px" }} type="text" placeholder="Masukkan Nama Depan" value={lastname} onChange={handleLastnameChange} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: "14px" }}>Full Name</Form.Label>
                            <Form.Control id="fullName" style={{ fontSize: "14px", padding: "10px 12px" }} type="text" placeholder="Masukkan Nama Lengkap" value={fullname} disabled />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: "14px" }}>Email address</Form.Label>
                            <Form.Control id="email" style={{ fontSize: "14px", padding: "10px 12px" }} type="email" placeholder="Masukkan Email" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: "14px" }}>Address</Form.Label>
                            <Form.Control id="address" style={{ fontSize: "14px", padding: "10px 12px" }} type="text" placeholder="Masukkan Alamat" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: "14px" }}>Telephone</Form.Label>
                            <Form.Control id="phoneNumber" style={{ fontSize: "14px", padding: "10px 12px" }} type="text" placeholder="Masukkan Nomor Telepon Aktif" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: "14px" }}>Password</Form.Label>
                            <Form.Control id="password" style={{ fontSize: "14px", padding: "10px 12px" }} type="password" placeholder="Masukkan Kata Sandi" />
                          </Form.Group>
                          <Form.Group className="mt-5">
                            <Button onClick={register} className="py-2" style={{ width: "100%", background: "var(--blue-300, #36F)", fontSize: "12px" }}>
                              Daftar
                            </Button>
                          </Form.Group>
                        </Form>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Register;
