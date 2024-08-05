import PropTypes from "prop-types";
import { useState } from "react";
import ReactPaginate from "react-paginate";

function ListArtikelAdmin({ artikel, onDeleteArtikel, onUpdateArtikel, onPreviewArtikel }) {
  const ITEMS_PER_PAGE = 6;
  const [activePage, setActivePage] = useState(1); // Halaman aktif
  const totalItems = artikel.length; // Jumlah total artikel

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber.selected + 1);
  };

  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedArtikel = artikel.slice(startIndex, endIndex);

  return (
    <>
      {displayedArtikel.map((item) => (
        <table className="table table-bordered" key={item.id}>
          <thead>
            <tr>
              <th className="text-center" width="900px" scope="col">
                Title
              </th>
              <th className="text-center" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <div className="artikel-information d-flex mt-3">
                    <p className="badge bg-primary">{item.categori}</p>
                    <p className="text-muted px-5">{item.createdAt}</p>
                  </div>
                </div>
              </td>
              <td className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={() => onPreviewArtikel(item.id)}>
                  Preview
                </button>
                <button className="btn btn-warning mx-2" onClick={() => onUpdateArtikel(item.id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDeleteArtikel(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
      <div className="admin-pagination">
        <ReactPaginate pageCount={Math.ceil(totalItems / ITEMS_PER_PAGE)} pageRangeDisplayed={5} marginPagesDisplayed={2} onPageChange={handlePageChange} containerClassName="pagination" activeClassName="active" />
      </div>
    </>
  );
}

ListArtikelAdmin.propTypes = {
  artikel: PropTypes.array.isRequired,
  onDeleteArtikel: PropTypes.func.isRequired,
  onUpdateArtikel: PropTypes.func.isRequired,
  onPreviewArtikel: PropTypes.func.isRequired,
};

export default ListArtikelAdmin;
