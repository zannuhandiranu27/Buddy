import bannerArtikel from "../../assets/img/banner_artikel.png";
import "../../assets/css/LandingPage.css";
import { NavLink } from "react-router-dom";

function HomeArtikel() {
  return (
    <section className="HomeArtikel mt-5">
      <div className="container">
        <div className="row text-center">
          <div className="heading">
            <span>Bersama Buddy, mari kita memerangi bullying!</span>
            <p>
              Ayo tingkatkan pengetahuan kamu mengenai <br /> dampak dan akibat
              dari bullying.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 text-center">
            <img src={bannerArtikel} alt="image" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="artikel-text">
              <br />
              <br />
              <span>Artikel</span>
              <p>
                Kami Menyediakan informasi dan bacaan yang cocok untuk sobat
                buddy meningkatkan pengetahuan mengenai bullying
              </p>
              <NavLink to="/artikel">
                <button>Lihat Selengkapnya</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeArtikel;
