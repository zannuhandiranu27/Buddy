import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/LandingPage.css";
import backgroundBanner from "../../assets/img/background_bullying.png";
import imgCard from "../../assets/img/img-card-1.png";
import CardHome from "../CardHome";
import { useEffect } from "react";
import { getArtikel } from "../../redux/reducer/artikelReducer";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function HomeListArtikel() {
  const dispatch = useDispatch();
  const { artikel } = useSelector((state) => state.artikel);
  console.log(artikel);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    dispatch(getArtikel());
  }, [dispatch]);

  return (
    <section
      className="HomeListArtikel mt-5"
      style={{
        backgroundImage: `url(${backgroundBanner})`,
        width: "100%",
        minHeight: "715px",
      }}
    >
      <div className="container">
        <div className="row heading text-center pt-5">
          <span>Tips untuk Sobat Buddy</span>
          <p>Berikut tips untuk mencegah terjadinya bullying yang bisa sobat buddy lakukan ya.</p>
        </div>
        <div className="row justify-content-md-center mt-5">
          <Slider {...settings}>
            {artikel.map((item) => {
              return (
                <div className="col-md-4" key={item.id}>
                  <CardHome src={item.image_source} tittle={item.title} onClick={() => handleDetail(item.id)} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default HomeListArtikel;
