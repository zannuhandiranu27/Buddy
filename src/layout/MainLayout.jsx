
import Navbar from './../components/Navbar';
import FooterAtas from './../components/FooterAtas';
import FooterBawah from './../components/FooterBawah';

function MainLayout({children}) {
  return (
    <>
    <section className="main-layout">
        <Navbar />
        {children}
        <FooterAtas />
        <FooterBawah />
    </section>
    </>
  )
}

export default MainLayout