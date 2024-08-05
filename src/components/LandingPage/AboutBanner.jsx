import { NavLink } from "react-router-dom";
import "../../assets/css/LandingPage.css";

function AboutBanner() {
  return (
    <>
      <section className="aboutBanner">
        <div className="container">
          <span>Apa itu Buddy</span>
          <p>
            Buddy merupakan platform edukasi untuk membantu kalian dalam
            meningkatkan kesadaran serta kepedulian terhadap kasus bullying di
            dunia pendidikan terutama di Indonesia.
          </p>
          <NavLink to="/tentangKami">
          <button>Baca Selengkapnya</button>
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default AboutBanner;
