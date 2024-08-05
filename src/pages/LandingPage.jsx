import "../assets/css/LandingPage.css";
import MainLayout from "./../layout/MainLayout";
import Hero from "../components/LandingPage/Hero";
import AboutBanner from "../components/LandingPage/AboutBanner";
import HomeArtikel from "../components/LandingPage/HomeArtikel";
import HomeListArtikel from "../components/LandingPage/HomeListArtikel";
import HomeFormLapor from "../components/LandingPage/HomeFormLapor";

function LandingPage() {
  return (
    <>
      <MainLayout>
        <Hero />
        <AboutBanner />
        <HomeArtikel />
        <HomeListArtikel />
        <HomeFormLapor />
      </MainLayout>
    </>
  );
}

export default LandingPage;
