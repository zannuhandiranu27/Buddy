import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Button, Col, Container, Image, Modal, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Success from '../assets/img/Success 1.png';
import '../assets/css/FormPelaporan.css'

function FormPelaporan(props) {
  const userData = useSelector((state) => state.users.userData);
  const [laporan, setLaporan] = useState({
    judul: "",
    isi: "",
    kategori: "",
    instansi: "",
    tanggal: "",
    lokasi: "",
    status: "Menunggu"
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nav = useNavigate()
  const currentDate = new Date().toISOString().split("T")[0];
  const handleSubmit = (e) => {
    // eslint-disable-next-line react/prop-types
    e.preventDefault()
    // eslint-disable-next-line react/prop-types
    if (props.data) {
      // eslint-disable-next-line react/prop-types
      laporan.pelapor = userData.fullname
      laporan.user_id = userData.id
      axios.post('https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan', laporan).then(
        res => {
          console.log(res)
          setLaporan({
            judul: "",
            isi: "",
            kategori: "",
            instansi: "",
            tanggal: "",
            lokasi: "",
            pelapor: "",
            user_id: "",
          })
          const successMessage = "Laporan berhasil dikirim. Silakan tunggu sampai laporan diproses atau lihat riwayatnya di halaman dashboard.";
          alert(successMessage);

          handleShow();
          nav("/dashboard")
        }
      )
    } else {
      nav('/login')
    }
  }
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
              <Col lg={9} className='mx-auto'>
                <div className='card__form px-5 text-start'>
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
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlTextarea1">
                      <Form.Label>Isi Laporan</Form.Label>
                      <Form.Control value={laporan.isi} id="laporan" className="laporan" as="textarea" rows={6} placeholder='Ceritakan Masalah Anda *' onChange={(e) => setLaporan({ ...laporan, isi: e.target.value })} required />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" >
                      <Form.Label>Kategori Laporan</Form.Label>
                      <Form.Select
                        value={laporan.kategori}
                        aria-label="Default select example"
                        id="kategori"
                        onChange={(e) => setLaporan({ ...laporan, kategori: e.target.value })}
                        required // Tambahkan atribut required di sini
                      >
                        <option value="" disabled>Pilih Kategori Laporan Bullying Anda *</option>
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
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Pilih Tanggal</Form.Label>
                      <Form.Control className="tanggal" id="tanggal" type="date" min="2023-07-07" max={currentDate} placeholder="Pilih Tanggal Kejadian *" required onFocus={(e) => (e.target.type = "date")} onChange={(e) => setLaporan({ ...laporan, tanggal: new Date(e.target.value) })} />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-4" id="exampleForm.ControlInput1">
                      <Form.Label>Lokasi</Form.Label>
                      <Form.Control value={laporan.lokasi} className="Lokasi" id="Lokasi" type="text" placeholder="Ketik Lokasi Kejadian *" onChange={(e) => setLaporan({ ...laporan, lokasi: e.target.value })} required />
                    </Form.Group>
                    <hr className='my-4' />
                    <Button type='submit'>Kirim Laporan</Button>
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
  )
}
export default FormPelaporan;