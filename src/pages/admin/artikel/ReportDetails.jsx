import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../../layout/AdminLayout";
import { Card, Spinner, Alert, Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../../assets/css/Laporan.css"; // Make sure this path is correct

const MySwal = withReactContent(Swal);

function ReportDetails() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan/${id}`);
        console.log("Fetched report data:", response.data); // Logging data
        setReport(response.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleProcessClick = async () => {
    try {
      await axios.put(`https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan/${id}`, { status: "Diproses" });
      setReport((prevReport) => ({ ...prevReport, status: "Diproses" }));
      MySwal.fire("Success", "Report status updated to 'Diproses'.", "success");
    } catch (error) {
      console.error("Error updating status:", error);
      MySwal.fire("Error", "Failed to update report status. Please try again.", "error");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Container className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container className="py-5">
        <h2 className="mb-4">Detail Laporan</h2>
        {report ? (
          <Card className="shadow-sm">
            <Card.Header as="h5">{report.judul}</Card.Header>
            <Card.Body className="card-body">
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Judul:</strong> {report.judul}
                  </p>
                  <p>
                    <strong>Isi:</strong> {report.isi}
                  </p>
                  <p>
                    <strong>Kategori:</strong> {report.kategori}
                  </p>
                  <p>
                    <strong>Instansi:</strong> {report.instansi}
                  </p>
                  <p>
                    <strong>Tanggal:</strong> {report.tanggal}
                  </p>
                  <p>
                    <strong>Lokasi:</strong> {report.lokasi}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Email:</strong> {report.email || "Tidak Tersedia"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {report.phone || "Anonym"}
                  </p>
                  <p>
                    <strong>Saksi:</strong> {report.witnesses || "Anonym"}
                  </p>
                  <p>
                    <strong>Status:</strong> {report.status}
                  </p>
                  <p>
                    <strong>Bukti:</strong> <img src={report.bukti} alt="Bukti" />
                  </p>
                </Col>
              </Row>
              {report.status === "Menunggu" && (
                <Button className="mt-3" variant="info" onClick={handleProcessClick}>
                  Proses Laporan
                </Button>
              )}
            </Card.Body>
          </Card>
        ) : (
          <Alert variant="warning">Laporan tidak ditemukan.</Alert>
        )}
      </Container>
    </AdminLayout>
  );
}

export default ReportDetails;
