import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/AdminLayout";

const ITEMS_PER_PAGE = 5; // Number of items to display per page
const ROW_HEIGHT = '40px'; // Fixed height for each row

function Datapelaporan() {
  const [waitingReports, setWaitingReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan', {
          params: {
            status: 'Menunggu'
          }
        });

        setWaitingReports(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleProcessClick = async (reportId, event) => {
    try {
      event.preventDefault();

      await axios.put(`https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan/${reportId}`, {
        status: 'Diproses',
      });

      setWaitingReports(prevReports =>
        prevReports.map(report =>
          report.id === reportId ? { ...report, status: 'Diproses' } : report
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Paginate the reports
  const indexOfLastReport = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReport = indexOfLastReport - ITEMS_PER_PAGE;
  const currentReports = waitingReports.slice(indexOfFirstReport, indexOfLastReport);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <h2>Laporan Menunggu</h2>
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd', background: '#f2f2f2', height: ROW_HEIGHT }}>
              <th style={{ padding: '10px', textAlign: 'left', width: '40%' }}>Judul</th>
              <th style={{ padding: '10px', textAlign: 'left', width: '20%' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left', width: '30%' }}>Isi</th>
              <th style={{ padding: '10px', textAlign: 'left', width: '10%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
        {currentReports.map((report) => (
          <tr key={report.id} style={{ borderBottom: '1px solid #ddd', height: ROW_HEIGHT }}>
            <td style={{ padding: '10px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{report.judul}</td>
            <td style={{ padding: '10px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{report.status}</td>
            <td style={{ padding: '10px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{report.isi}</td>
            <td style={{ padding: '10px', textAlign: 'left' }}>
              <button onClick={(event) => handleProcessClick(report.id, event)} className="btn btn-info">Proses</button>
            </td>
          </tr>
        ))}
      </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastReport >= waitingReports.length}>
          Next
        </button>
      </div>
    </AdminLayout>
  );
}

export default Datapelaporan;