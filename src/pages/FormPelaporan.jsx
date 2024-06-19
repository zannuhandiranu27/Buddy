import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Button, Col, Container, Image, Modal, Row, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Success from "../assets/img/Success 1.png";
import "../assets/css/FormPelaporan.css";

function FormPelaporan(props) {
  const userData = useSelector((state) => state.users.userData);
  const [laporan, setLaporan] = useState({
    judul: "",
    isi: "",
    kategori: "",
    instansi: "",
    tanggal: "",
    lokasi: "",
    bukti: "",
    email: "",
    status: "Menunggu",
  });
  const [show, setShow] = useState(false);
  const [mathQuestion, setMathQuestion] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [kategori, setKategori] = useState(""); // State for category
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nav = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];

  // Generate random math question
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathQuestion(`${num1} + ${num2} =`);
    setMathAnswer((num1 + num2).toString());
  };

  // Handle category change
  const handleKategoriChange = (e) => {
    setKategori(e.target.value);
  };

  // Handle user answer change
  const handleUserAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer !== mathAnswer) {
      alert("Jawaban salah! Silakan coba lagi.");
      generateMathQuestion();
      setUserAnswer("");
      return;
    }
    laporan.kategori = kategori; // Update category in laporan object
    laporan.pelapor = userData.fullname;
    laporan.user_id = userData.id;
    axios
      .post("https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan", laporan)
      .then((res) => {
        setLaporan({
          judul: "",
          isi: "",
          kategori: "",
          instansi: "",
          tanggal: "",
          lokasi: "",
          bukti: "",
          email: "",
          pelapor: "",
          user_id: "",
        });
        const successMessage = "Laporan berhasil dikirim. Silakan tunggu sampai laporan diproses atau lihat riwayatnya di halaman dashboard.";
        alert(successMessage);
        handleShow();
        nav("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal mengirim laporan.");
      });
  };

  // Initialize math question when component mounts
  useEffect(() => {
    if (userData) {
      generateMathQuestion();
    }
  }, [userData]);

  return (
    <>
      <section className="formPelaporan">
        <Navbar />
        <div className="banner">
          <Container fluid>
            <Row className="text-center">
              <Col lg={12}>
                <h2>Selamat Datang di layanan Pelaporan</h2>
                <p>Segera Laporkan apabila Sobat Buddy melihat ataupun menjadi korban Bullying</p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="form">
          <Container>
            <Row>
              <Col lg={9} className="mx-auto">
                <div className="card__form px-5 text-start">
                  {!userData && <Alert variant="warning">Anda harus login terlebih dahulu untuk dapat mengisi dan mengirim form.</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <h3>Sampaikan Laporan Anda</h3>
                    <p>Silahkan isi formulir dibawah dengan Bahasa Indonesia yang baik dan benar</p>

                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Judul</Form.Label>
                      <Form.Control
                        value={laporan.judul}
                        className="judul"
                        id="judul"
                        type="text"
                        placeholder="Ketik Judul Laporan Anda *"
                        onChange={(e) => {
                          const inputJudul = e.target.value;
                          if (inputJudul.length <= 25) {
                            setLaporan({ ...laporan, judul: inputJudul });
                          } else {
                            alert("Maksimal 25 karakter!");
                          }
                        }}
                        maxLength={25}
                        required
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlTextarea1">
                      <Form.Label>Isi Laporan</Form.Label>
                      <Form.Control
                        value={laporan.isi}
                        id="laporan"
                        className="laporan"
                        as="textarea"
                        rows={6}
                        placeholder="Ceritakan Masalah Anda *"
                        onChange={(e) => setLaporan({ ...laporan, isi: e.target.value })}
                        required
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4">
                      <Form.Label>Kategori Laporan</Form.Label>
                      <Form.Select value={kategori} onChange={handleKategoriChange} required disabled={!userData}>
                        <option value="" disabled>
                          Pilih Kategori Laporan Bullying Anda *
                        </option>
                        <option value="Verbal">Verbal</option>
                        <option value="Fisik">Fisik</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Isi Nama Sekolah</Form.Label>
                      <Form.Control
                        value={laporan.instansi}
                        className="instansi"
                        id="instansi"
                        type="text"
                        placeholder="Isi Nama Sekolah *"
                        onChange={(e) => {
                          const inputInstansi = e.target.value;
                          if (inputInstansi.length <= 25) {
                            setLaporan({ ...laporan, instansi: inputInstansi });
                          } else {
                            alert("Maksimal 25 karakter untuk Nama Sekolah!");
                          }
                        }}
                        maxLength={25}
                        required
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Pilih Tanggal</Form.Label>
                      <Form.Control
                        className="tanggal"
                        id="tanggal"
                        type="date"
                        min="2023-07-07"
                        max={currentDate}
                        placeholder="Pilih Tanggal Kejadian*"
                        required
                        onFocus={(e) => (e.target.type = "date")}
                        onChange={(e) => setLaporan({ ...laporan, tanggal: new Date(e.target.value) })}
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Lokasi</Form.Label>
                      <Form.Control
                        value={laporan.lokasi}
                        className="Lokasi"
                        id="Lokasi"
                        type="text"
                        placeholder="Ketik Lokasi Kejadian *"
                        onChange={(e) => setLaporan({ ...laporan, lokasi: e.target.value })}
                        required
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Lampirkan Bukti (Link)</Form.Label>
                      <Form.Control value={laporan.bukti} className="bukti" id="bukti" type="url" placeholder="Masukkan Link Bukti *" onChange={(e) => setLaporan({ ...laporan, bukti: e.target.value })} required disabled={!userData} />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Email yang dapat dihubungi</Form.Label>
                      <Form.Control value={laporan.email} className="email" id="email" type="email" placeholder="Masukkan Email Anda *" onChange={(e) => setLaporan({ ...laporan, email: e.target.value })} required disabled={!userData} />
                    </Form.Group>
                    {userData && (
                      <Form.Group className="mb-3 mt-4">
                        <Form.Label>{mathQuestion}</Form.Label>
                        <Form.Control type="number" value={userAnswer} onChange={handleUserAnswerChange} required />
                      </Form.Group>
                    )}
                    <hr className="my-4" />
                    <Button type="submit" disabled={!userData}>
                      Kirim Laporan
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <Row className="text-center">
                  <Col lg={12}>
                    <h2>Laporan Berhasil Dikirim</h2>
                    <p>Silahkan menunggu sampai laporan diproses atau dapat dilihat riwayatnya di halaman dashboard </p>
                    <Image src={Success} />
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      </section>
    </>
  );
}

export default FormPelaporan;
