import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Button, Col, Container, Image, Row, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Success from "../assets/img/Success 1.png";
import "../assets/css/FormPelaporan.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
    email: userData ? userData.email : "",
    phone: "",
    anonymous: false,
    witnesses: "",
    status: "Menunggu",
    pelaporRole: "", // Role of the reporter: "Saksi" or "Korban"
  });
  const [mathQuestion, setMathQuestion] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [kategori, setKategori] = useState("");
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
      MySwal.fire("Error", "Jawaban salah! Silakan coba lagi.", "error");
      generateMathQuestion();
      setUserAnswer("");
      return;
    }

    const updatedLaporan = { ...laporan, kategori, pelapor: userData.fullname, user_id: userData.id };

    axios
      .post("https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan", updatedLaporan)
      .then((res) => {
        setLaporan({
          judul: "",
          isi: "",
          kategori: "",
          instansi: "",
          tanggal: "",
          lokasi: "",
          bukti: "",
          email: userData.email,
          phone: "",
          anonymous: false,
          witnesses: "",
          status: "Menunggu",
          pelaporRole: "", // Reset pelapor role
        });
        MySwal.fire({
          title: "Laporan Berhasil Dikirm!",
          text: "Silakan tunggu sampai laporan diproses atau lihat riwayatnya di halaman dashboard.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            nav("/dashboard");
          },
        });
      })
      .catch((err) => {
        console.error(err);
        MySwal.fire("Error", "Gagal mengirim laporan.", "error");
      });
  };

  // Initialize math question when component mounts
  useEffect(() => {
    if (userData) {
      generateMathQuestion();
      setLaporan((prevLaporan) => ({ ...prevLaporan, email: userData.email }));
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

                    <Form.Group className="mb-3 mt-4" controlId="pelaporRole">
                      <Form.Label>Anda adalah:</Form.Label>
                      <Form.Check type="radio" label="Saksi" name="pelaporRole" value="Saksi" onChange={(e) => setLaporan({ ...laporan, pelaporRole: e.target.value })} required disabled={!userData} />
                      <Form.Check type="radio" label="Korban" name="pelaporRole" value="Korban" onChange={(e) => setLaporan({ ...laporan, pelaporRole: e.target.value })} required disabled={!userData} />
                    </Form.Group>

                    <Form.Group className="mb-3 mt-4" controlId="judul">
                      <Form.Label>Judul</Form.Label>
                      <Form.Control
                        value={laporan.judul}
                        type="text"
                        placeholder="Ketik Judul Laporan Anda *"
                        onChange={(e) => {
                          const inputJudul = e.target.value;
                          if (inputJudul.length <= 25) {
                            setLaporan({ ...laporan, judul: inputJudul });
                          } else {
                            MySwal.fire("Error", "Maksimal 25 karakter!", "error");
                          }
                        }}
                        maxLength={25}
                        required
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" controlId="isi">
                      <Form.Label>Isi Laporan</Form.Label>
                      <Form.Control value={laporan.isi} as="textarea" rows={6} placeholder="Ceritakan Masalah Anda *" onChange={(e) => setLaporan({ ...laporan, isi: e.target.value })} required disabled={!userData} />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" controlId="kategori">
                      <Form.Label>Kategori Laporan</Form.Label>
                      <Form.Select value={kategori} onChange={handleKategoriChange} required disabled={!userData}>
                        <option value="" disabled>
                          Pilih Kategori Laporan Bullying Anda *
                        </option>
                        <option value="Verbal">Verbal</option>
                        <option value="Non Verbal">Non Verbal</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" controlId="instansi">
                      <Form.Label>Nama Sekolah/Instansi</Form.Label>
                      <Form.Control
                        value={laporan.instansi}
                        type="text"
                        placeholder="Isi Nama Sekolah/Instansi *"
                        onChange={(e) => {
                          const inputInstansi = e.target.value;
                          if (inputInstansi.length <= 50) {
                            setLaporan({ ...laporan, instansi: inputInstansi });
                          } else {
                            MySwal.fire("Error", "Maksimal 50 karakter untuk Nama Sekolah/Instansi!", "error");
                          }
                        }}
                        maxLength={50}
                        required
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" controlId="tanggal">
                      <Form.Label>Pilih Tanggal</Form.Label>
                      <Form.Control
                        type="date"
                        min="2023-07-07"
                        max={currentDate}
                        placeholder="Pilih Tanggal Kejadian*"
                        required
                        onFocus={(e) => (e.target.type = "date")}
                        onChange={(e) => setLaporan({ ...laporan, tanggal: e.target.value })}
                        disabled={!userData}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" controlId="lokasi">
                      <Form.Label>Lokasi Kejadian</Form.Label>
                      <Form.Control value={laporan.lokasi} type="text" placeholder="Ketik Lokasi Kejadian *" onChange={(e) => setLaporan({ ...laporan, lokasi: e.target.value })} required disabled={!userData} />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" controlId="bukti">
                      <Form.Label>Lampirkan Bukti (Link/URL)</Form.Label>
                      <Form.Control value={laporan.bukti} type="url" placeholder="Isi link/url yang berisi gambar/video/dokumen pendukung" onChange={(e) => setLaporan({ ...laporan, bukti: e.target.value })} disabled={!userData} />
                    </Form.Group>

                    {!laporan.anonymous && (
                      <>
                        <Form.Group className="mb-3 mt-4" controlId="witnesses">
                          <Form.Label>Nama Saksi</Form.Label>
                          <Form.Control value={laporan.witnesses} type="text" placeholder="Isi nama saksi jika ada (opsional)" onChange={(e) => setLaporan({ ...laporan, witnesses: e.target.value })} disabled={!userData} />
                        </Form.Group>
                        <Form.Group className="mb-3 mt-4" controlId="phone">
                          <Form.Label>Nomor Telepon/WhatsApp</Form.Label>
                          <Form.Control
                            value={laporan.phone}
                            type="tel"
                            placeholder="Nomor Telepon atau WhatsApp aktif"
                            onChange={(e) => {
                              const inputPhone = e.target.value;
                              const phoneRegex = /^\+?\d{0,13}$/; // Regex to allow optional "+" at the start and up to 13 digits
                              if (phoneRegex.test(inputPhone)) {
                                setLaporan({ ...laporan, phone: inputPhone });
                              } else {
                                MySwal.fire("Error", "Nomor telepon harus berupa angka dan maksimal 13 digit!", "error");
                              }
                            }}
                            maxLength={13}
                            disabled={!userData}
                          />
                        </Form.Group>
                      </>
                    )}

                    <Form.Group className="mb-3 mt-4" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control value={laporan.email} type="email" placeholder="Email aktif" readOnly disabled />
                    </Form.Group>

                    <Form.Group className="mb-3 mt-4" controlId="anonymous">
                      <Form.Check type="checkbox" label="Sembunyikan identitas saya (Laporkan sebagai anonim)" checked={laporan.anonymous} onChange={(e) => setLaporan({ ...laporan, anonymous: e.target.checked })} disabled={!userData} />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" controlId="mathQuestion">
                      <Form.Label>Pertanyaan Matematika: {mathQuestion}</Form.Label>
                      <Form.Control type="text" placeholder="Masukkan jawaban Anda" value={userAnswer} onChange={handleUserAnswerChange} required disabled={!userData} />
                    </Form.Group>
                    <Button className="mb-5 mt-4" type="submit" disabled={!userData}>
                      Kirim Laporan
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}

export default FormPelaporan;
