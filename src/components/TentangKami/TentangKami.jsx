import "../../assets/css/TentangKami.css";
import hero from "../../assets/img/hero.png";
import ikin from "../../assets/img/gambar-ikin.png";
import nalan from "../../assets/img/gambar-nalan.png";
import zanu from "../../assets/img/gambar-zanu.png";
import mila from "../../assets/img/gambar-mila.png";

function TentangKamiComponent() {
  return (
    <>
      <div className="container">
        <section className="hero">
          <div className="row">
            <p className="text-heading text-center">Buddy</p>
            <p className="text-paragraph text-center mx-auto">
              Buddy merupakan platform edukasi untuk membantu kalian dalam
              meningkatkan kesadaran serta kepedulian terhadap kasus bullying di
              dunia pendidikan terutama di Indonesia.
            </p>
          </div>
          <div className="row">
            <img className="" src={hero} alt="tim kami" />
          </div>
        </section>
        <section className="timKami">
          <div className="container">
            <div className="row">
              <p className="text-heading text-center">Tim Kami</p>
              <p
                className="text-paragraph text-center mx-auto"
                style={{ width: "700px" }}
              >
                Bersama sama berkolaborasi untuk Indonesia sebagai upaya
                preventif terjadinya perilaku bullying di dunia pendidikan.
              </p>
            </div>
            <div className="row justify-content-center mb-3">
              <div className="col-md-3">
                <div
                  className="animate__animated animate bounce card mb-3 mx-sm-auto"
                  style={{ width: "18rem" }}
                >
                  <div className="container mt-3">
                    <img
                      src={ikin}
                      className="card-img-top "
                      alt="..."
                      style={{ width: "120px" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title ms-1">Ikin Sugiharto</h5>
                    <p className="card-text  ms-1">Front-end</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="animate__animated animate bounce card mx-sm-auto"
                  style={{ width: "18rem" }}
                >
                  <div className="container mt-3">
                    <img
                      src={nalan}
                      className="card-img-top "
                      alt="..."
                      style={{ width: "120px" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title ms-1">Nalan Ridlo F.</h5>
                    <p className="card-text  ms-1">Front-end</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center pb-5">
              <div className="col-md-3">
                <div
                  className="animate__animated animate bounce card mb-3 mx-sm-auto"
                  style={{ width: "18rem" }}
                >
                  <div className="container mt-3">
                    <img
                      src={zanu}
                      className="card-img-top "
                      alt="..."
                      style={{ width: "120px" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title ms-1">Teuku Zannu</h5>
                    <p className="card-text  ms-1">Front-end</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="animate__animated animate bounce card mx-sm-auto"
                  style={{ width: "18rem" }}
                >
                  <div className="container mt-3">
                    <img
                      src={mila}
                      className="card-img-top "
                      alt="..."
                      style={{ width: "120px" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title ms-1">Mila Sanvania</h5>
                    <p className="card-text  ms-1">Front-end</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default TentangKamiComponent;
