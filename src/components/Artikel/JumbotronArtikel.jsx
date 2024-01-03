import imgJumbotron from "../../assets/img/img-jumbotron.png";
import "../../assets/css/jumbotronArtikel.css";
function JumbotronArtikel() {
  return (
    <section
      className="jumbotronArtikel"
      style={{
        backgroundImage: `url(${imgJumbotron})`,
        height: "230 px",
      }}
    >
      <div className="container">
        <div className="row text-justify">
          <div className="col">
            <div className="content text-light">
              <p

              >
                Temukan Pengetahuan
                <br />
                Tentang Bullying Disini
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JumbotronArtikel;
