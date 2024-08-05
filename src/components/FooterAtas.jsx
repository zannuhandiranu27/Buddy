import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import footerLogo from "../assets/img/footer-logo.png";
import footerSkilvul from "../assets/img/footer-skilvul.png";
import "../assets/css/FooterAtas.css";
import { NavLink } from "react-router-dom";

function FooterAtas() {
  return (
    <>
      <footer>
        <div className="container pt-3">
          <div className="row">
            <div className="logo col-sm-12 col-md-4">
              <a className="text-decoration-none" href="#">
                <img
                  src={footerLogo}
                  alt="Logo"
                  width="50"
                  height="50"
                  className="d-inline-block align-text-center"
                />
                Buddy
              </a>
              <p className="mt-3 ">
                Buddy merupakan platform edukasi untuk membantu kalian dalam
                meningkatkan kesadaran serta kepedulian terhadap kasus bullying
                di dunia pendidikan terutama di Indonesia.
              </p>
              <p className="mt-3 ">Email : contact@buddy.com</p>

              <div className="d-flex flex-row mb-3">
                <div className="p-2">
                  <BsInstagram />
                </div>
                <div className="p-2">
                  <BsLinkedin />
                </div>
                <div className="p-2">
                  <BsFacebook />
                </div>
                <div className="p-2">
                  <BsTwitter />
                </div>
              </div>
            </div>
            <div className="col-md-2 offset-md-2 col-sm-3 offset-sm-3 mb-3">
              <p className="text-heading-footer">Sitemap</p>
              <ul className="list-group">
                <li>
                  <NavLink className="nav-link text-light" to="/">
                  <a>Beranda</a>
                  </NavLink>
                </li>
                <li>
                <NavLink className="nav-link text-light" to="/tentangKami">
                  <a>Tentang Kami</a>
                  </NavLink>
                </li>
                <li>
                <NavLink className="nav-link text-light" to="/formLaporan">
                  <a>Form Laporan</a>
                  </NavLink>
                </li>
                <li>
                <NavLink className="nav-link text-light" to="/artikel">
                  <a>Artikel</a>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-3 offset-md-1">
              <p className="text-heading-footer">Challenge Partner</p>
              <a href="https://skilvul.com">
                <img src={footerSkilvul} alt="skilvul" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterAtas;
