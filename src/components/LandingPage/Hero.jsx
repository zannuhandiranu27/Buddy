import { useEffect, useState } from "react";
import "../../assets/css/LandingPage.css";
import orang from "../../assets/img/orang.png";
import Banner from "../Banner";

function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section className="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-12 col-md-6 col-lg-6 text-dark mt-5">
            <p className="hero-tag">#LawanBullying</p>
            <p className="hero-heading">Jangan Takut!</p>
            <p className="hero-heading" style={{
              color: '#3366FF',
            }}>Ayo Laporkan Bullying</p>
            <p className="hero-description">
              Komisi Perlindungan Anak Indonesia (KPAI) menerima setidaknya
              37.381 laporan perundungan dalam kurun waktu 2011 hingga 2019.
              Dari jumlah tersebut,2.473 kasus diduga terjadi di dunia
              pendidikan.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
            <div className="d-flex justify-content-end">
              <img src={orang} className="wok-profile w-485" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
        {windowWidth >= 768 ? <Banner /> : null}
      </div>
      <br />
      <br />
    </section>
  );
}
export default Hero;
