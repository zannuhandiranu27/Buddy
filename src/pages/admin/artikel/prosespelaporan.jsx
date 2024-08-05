import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/AdminLayout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table, Button, Spinner, Alert, Container, Pagination } from "react-bootstrap";
import "../../../assets/css/Laporan.css";

const MySwal = withReactContent(Swal);

const ITEMS_PER_PAGE = 5;
const ROW_HEIGHT = "60px";

function Prosespelaporan() {
  const [processedReports, setProcessedReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan", {
          params: { status: "Diproses" },
        });
        setProcessedReports(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        MySwal.fire("Error", "Failed to fetch reports. Please try again later.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCompleteClick = async (reportId) => {
    try {
      await axios.put(`https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan/${reportId}`, { status: "Selesai" });
      setProcessedReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
      MySwal.fire("Success", "Report status updated to 'Selesai'.", "success");
    } catch (error) {
      console.error("Error updating status:", error);
      MySwal.fire("Error", "Failed to update report status. Please try again.", "error");
    }
  };

  const indexOfLastReport = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReport = indexOfLastReport - ITEMS_PER_PAGE;
  const currentReports = processedReports.slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(processedReports.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <Container className="py-5">
        <h2>Laporan Diproses</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="table-container">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Isi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.length > 0 ? (
                  currentReports.map((report, index) => (
                    <tr key={report.id} style={{ height: ROW_HEIGHT }}>
                      <td>{report.judul}</td>
                      <td>{report.status}</td>
                      <td>{report.isi}</td>
                      <td>
                        <Button onClick={() => handleCompleteClick(report.id)} variant="success">
                          Selesai
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No reports available</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={indexOfLastReport >= processedReports.length}>
                Next
              </Pagination.Next>
            </Pagination>
          </div>
        )}
      </Container>
    </AdminLayout>
  );
}

export default Prosespelaporan;
