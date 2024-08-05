import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table, Button, Spinner, Alert, Container, Pagination } from "react-bootstrap";
import "../../../assets/css/Laporan.css"; // Make sure this path is correct

const MySwal = withReactContent(Swal);

const ITEMS_PER_PAGE = 5;

function Datapelaporan() {
  const [waitingReports, setWaitingReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan", {
          params: {
            status: "Menunggu",
          },
        });
        setWaitingReports(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
        MySwal.fire("Error", "Failed to fetch reports. Please try again later.", "error");
      }
    };
    fetchData();
  }, []);

  const handleProcessClick = async (reportId, event) => {
    event.preventDefault();
    try {
      await axios.put(`https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan/${reportId}`, {
        status: "Diproses",
      });
      setWaitingReports((prevReports) => prevReports.map((report) => (report.id === reportId ? { ...report, status: "Diproses" } : report)));
      MySwal.fire("Success", "Report status updated to 'Diproses'.", "success");
    } catch (error) {
      setError("Error updating status. Please try again later.");
      MySwal.fire("Error", "Failed to update report status. Please try again.", "error");
    }
  };

  const indexOfLastReport = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReport = indexOfLastReport - ITEMS_PER_PAGE;
  const currentReports = waitingReports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(waitingReports.length / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <Container className="py-5">
        <h2>Laporan Menunggu</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div className="table-container">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Isi</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report, index) => (
                  <tr key={report.id}>
                    <td>{report.judul}</td>
                    <td>{report.status}</td>
                    <td>{report.isi}</td>
                    <td>
                      <Button onClick={(event) => handleProcessClick(report.id, event)} variant="info">
                        Proses
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => nav(`/admin/laporan/${report.id}`)} variant="secondary">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </Pagination.Next>
            </Pagination>
          </div>
        )}
      </Container>
    </AdminLayout>
  );
}

export default Datapelaporan;
