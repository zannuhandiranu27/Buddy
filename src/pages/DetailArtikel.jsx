import { useEffect } from "react";
import "../assets/css/Artikel.css";
import MainLayout from "./../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getArtikel } from "./../redux/reducer/artikelReducer";
import { useParams } from "react-router-dom";

function DetailArtikel() {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const { artikel } = useSelector((state) => state.artikel);

  useEffect(() => {
    dispatch(getArtikel());
  }, []);

  return (
    <>
      <MainLayout>
        <section className="DetailArtikel">
          <div className="container">
            {artikel
              .filter((el) => el.id === id)
              .map((el) => (
                <>
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
                            <span className="badge bg-primary">
                              {el.categori}
                            </span>
                          </div>
                          <div className="ms-auto p-2">
                            <i className="fa fa-bookmark px-3"></i>
                            <span> {el.createdAt} </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-9">
                        <div className="judul">
                          <p>{el.title}</p>
                        </div>
                        <div className="desc mb-5">
                          {/* <p>{el.description}</p> */}
                          <div
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: el.description }}
                ></div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              ))}
          </div>
        </section>
      </MainLayout>
    </>
  );
}

export default DetailArtikel;
