import "../assets/css/LandingPage.css";
import logoBanner from "../assets/img/logo_banner.png";
import logoBanner2 from "../assets/img/Banner 2.png";
import logoBanner3 from "../assets/img/Banner 3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowLeft, BsArrowRight, BsChevronCompactLeft, BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };


  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow arrow-right" onClick={onClick}>
        <BsChevronRight />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow arrow-left" onClick={onClick}>
        <BsChevronLeft />
      </div>
    );
  }

  return (
    <>
      <section className="banner">

        <div className="parallax mt-5">
          <div className="row">
            <Slider {...settings}>
              <div className="section-banner">
                <div className="row d-flex align-items-center">
                  <div className="col-5 d-flex justify-content-center">
                    <img src={logoBanner} alt="banner" />
                  </div>
                  <div className="col-7 text-center">
                    <span>#StopBullying</span>
                    <p id="description">
                      Bullying adalah suatu tindakan atau perilaku yang <br />
                      dilakukan dengan cara menyakiti orang lain.
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-banner">
                <div className="row d-flex align-items-center">
                  <div className="col-5 d-flex justify-content-center">
                    <img src={logoBanner2} alt="banner" />
                  </div>
                  <div className="col-7 text-center">
                    <span>#StopBullying</span>
                    <p id="description">
                      Kenali efek dan cara mengatasi bullying.
                      Bullying tidak hanya terjadi secara fisik namun bisa secara verbal.
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-banner">
                <div className="row d-flex align-items-center">
                  <div className="col-5 d-flex justify-content-center">
                    <img src={logoBanner3} alt="banner" />
                  </div>
                  <div className="col-7 text-center">
                    <span>#StopBullying</span>
                    <p id="description">
                      Apabila kalian menjadi korban atau melihat aksi   suatu tindakan bullying
                      langsung laporkan kepihat terkait.
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
