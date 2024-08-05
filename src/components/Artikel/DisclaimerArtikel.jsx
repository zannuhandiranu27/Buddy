import { NavLink } from "react-router-dom";
import "../../assets/css/Artikel.css";

function DisclaimerArtikel() {
  return (
    <>
      <section
        className="DisclaimerArtikel"
        style={{
          backgroundColor: "#FB4141",
          minHeight: "100px",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <p className="disclaimer-title">Disclaimer</p>
              <p className="disclaimer-desc">
                Jika Anda/orang disekitar Anda sedang atau pernah menjadi korban
                bullyng Layanan ini dapat membantu anda.
              </p>
              <p className="disclaimer-info">
                Silahkan klik layanan pelaporan.
              </p>
            </div>
            <div className="col-md-5 text-center">
              <NavLink to="/formLaporan">
                <button>Layanan Pelaporan</button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DisclaimerArtikel;
