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
            <Card.Body>
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
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Lokasi:</strong> {report.lokasi}
                  </p>
                  <p>
                    <strong>Bukti:</strong>{" "}
                    <a href={report.bukti} target="_blank" rel="noopener noreferrer">
                      {report.bukti}
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong> {report.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {report.phone}
                  </p>
                  <p>
                    <strong>Saksi:</strong> {report.witnesses}
                  </p>
                  <p>
                    <strong>Komentar Tambahan:</strong> {report.additionalComments}
                  </p>
                  <p>
                    <strong>Status:</strong> {report.status}
                  </p>
                  <Button onClick={handleProcessClick} variant="info" className="mt-3">
                    Proses
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <Alert variant="warning">No report found.</Alert>
        )}
      </Container>
    </AdminLayout>
  );
}

export default ReportDetails;
