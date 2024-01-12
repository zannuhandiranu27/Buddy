import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/AdminLayout";

const ITEMS_PER_PAGE = 5;
const ROW_HEIGHT = "40px";

function Prosespelaporan() {
    const [processedReports, setProcessedReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan",
                    {
                        params: {
                            status: "Diproses",
                        },
                    }
                );

                setProcessedReports(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCompleteClick = async (reportId) => {
        try {
            await axios.put(
                `https://6454d642f803f34576329b54.mockapi.io/api/v1/pelaporan/${reportId}`,
                {
                    status: "Selesai",
                }
            );

            setProcessedReports((prevReports) =>
                prevReports.filter((report) => report.id !== reportId)
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const indexOfLastReport = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstReport = indexOfLastReport - ITEMS_PER_PAGE;
    const currentReports = processedReports.slice(
        indexOfFirstReport,
        indexOfLastReport
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AdminLayout>
            <h2>Laporan Diproses</h2>
            <div style={{ overflowX: "auto", marginTop: "20px" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                borderBottom: "1px solid #ddd",
                                background: "#f2f2f2",
                                height: ROW_HEIGHT,
                            }}
                        >
                            <th
                                style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    width: "40%",
                                }}
                            >
                                Judul
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    width: "20%",
                                }}
                            >
                                Status
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    width: "30%",
                                }}
                            >
                                Isi
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    width: "10%",
                                }}
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReports.map((report) => (
                            <tr
                                key={report.id}
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    height: ROW_HEIGHT,
                                }}
                            >
                                <td
                                    style={{
                                        padding: "10px",
                                        textAlign: "left",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {report.judul}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        textAlign: "left",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {report.status}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        textAlign: "left",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {report.isi}
                                </td>
                                <td style={{ padding: "10px", textAlign: "left" }}>
                                    <button onClick={() => handleProcessClick(report.id)} className="btn btn-success">
                                        Selesai
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastReport >= processedReports.length}
                >
                    Next
                </button>
            </div>
        </AdminLayout>
    );
}

export default Prosespelaporan;