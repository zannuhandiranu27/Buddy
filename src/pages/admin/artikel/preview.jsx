import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getArtikel } from "../../../redux/reducer/artikelReducer";
import AdminLayout from "../../../layout/AdminLayout";

function Preview() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artikel } = useSelector((state) => state.artikel);

  useEffect(() => {
    dispatch(getArtikel());
  }, [dispatch]);

  // Fungsi untuk memformat tanggal menjadi "DD MonthName YYYY"
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("id-ID", options);
    return formattedDate;
  };

  return (
    <>
      <AdminLayout>
        {artikel
          .filter((el) => el.id === id)
          .map((el) => (
            <section key={el.id}>
              <div className="row">
                <div className="col-md-12 text-center">
                  <img
                    src={el.image_source}
                    className="img-fluid"
                    alt="Responsive image"
                    style={{
                      height: "450px",
                      width: "925px",
                    }}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-9">
                  <div className="d-flex mb-3">
                    <div className="p-2">
                      <i className="fa-solid fa-user px-2"></i>
                      <span>Putri Tanjung</span>
                    </div>
                    <div className="p-2 px-5">
                      <span className="badge bg-primary">{el.categori}</span>
                    </div>
                    <div className="ms-auto p-2">
                      <i className="fa fa-bookmark px-3"></i>
                      <span> {formatDate(el.createdAt)} </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-9">
                  <div className="judul">
                    <h1 className="text-center">{el.title}</h1>
                  </div>
                  <div className="desc mb-5">
                    {/* <p>{el.description}</p> */}
                    <div className="card-text" dangerouslySetInnerHTML={{ __html: el.description }}></div>
                  </div>
                </div>
              </div>
            </section>
          ))}
      </AdminLayout>
    </>
  );
}

export default Preview;
