import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/AdminLayout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function RiwayatPelaporan() {
    const [completedReports, setCompletedReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan",
                    {
                        params: {
                            status: "Selesai",
                        },
                    }
                );

                setCompletedReports(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = async (reportId) => {
        MySwal.fire({
            title: "Are you sure want to delete this report?",
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
                    setCompletedReports(completedReports.filter(report => report.id !== reportId));
                    MySwal.fire("Deleted!", "The report has been deleted.", "success");
                } catch (error) {
                    console.error('Error deleting report:', error);
                    MySwal.fire("Error", "Failed to delete the report.", "error");
                }
            }
        });
    };

    // Paginate the reports
    const ITEMS_PER_PAGE = 5; // Number of items to display per page
    const indexOfLastReport = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstReport = indexOfLastReport - ITEMS_PER_PAGE;
    const currentReports = completedReports.slice(indexOfFirstReport, indexOfLastReport);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AdminLayout>
            <h2>Riwayat Pelaporan</h2>
            <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #ddd', background: '#f2f2f2' }}>
                            <th style={{ padding: '10px', textAlign: 'left', width: '40%' }}>Judul</th>
                            <th style={{ padding: '10px', textAlign: 'left', width: '20%' }}>Status</th>
                            <th style={{ padding: '10px', textAlign: 'left', width: '30%' }}>Isi</th>
                            <th style={{ padding: '10px', textAlign: 'left', width: '10%' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReports.map((report) => (
                            <tr key={report.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{report.judul}</td>
                                <td style={{ padding: '10px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{report.status}</td>
                                <td style={{ padding: '10px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{report.isi}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>
                                    <button onClick={() => handleDeleteClick(report.id)} className="btn btn-danger">
                                        Delete
                                    </button>

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
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastReport >= completedReports.length}>
                    Next
                </button>
            </div>
        </AdminLayout>
    );
}

export default RiwayatPelaporan;