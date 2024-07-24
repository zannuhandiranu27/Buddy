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

function RiwayatPelaporan() {
  const [completedReports, setCompletedReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan", {
          params: { status: "Selesai" },
        });
        setCompletedReports(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        MySwal.fire("Error", "Failed to fetch reports. Please try again later.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = async (reportId) => {
    MySwal.fire({
      title: "Are you sure you want to delete this report?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan/${reportId}`);
          setCompletedReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
          MySwal.fire("Deleted!", "The report has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting report:", error);
          MySwal.fire("Error", "Failed to delete the report. Please try again.", "error");
        }
      }
    });
  };

  const indexOfLastReport = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReport = indexOfLastReport - ITEMS_PER_PAGE;
  const currentReports = completedReports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(completedReports.length / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <Container className="py-5">
        <h2>Riwayat Pelaporan</h2>
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
                <tr style={{ height: ROW_HEIGHT }}>
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
                        <Button onClick={() => handleDeleteClick(report.id)} variant="danger">
                          Delete
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
              <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={indexOfLastReport >= completedReports.length}>
                Next
              </Pagination.Next>
            </Pagination>
          </div>
        )}
      </Container>
    </AdminLayout>
  );
}

export default RiwayatPelaporan;
