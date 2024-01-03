import '../assets/css/Dashboard.css'
import DashboardLayout from "../layout/DashboardLayout";
import ikin from "../assets/img/gambar-ikin.png";
import imgCard from "../assets/img/imageCard.png";


function Dashboard() {
  return (
    <>
      <DashboardLayout>
        <div className="container">
          <section className="icon-profile mt-3">
            <div className="row">
              <div className="col-12">
                <div className="profil">
                  <div className="row align-items-center">
                    <div className="col-md-1 col-sm-2">
                      <img
                        src={ikin}
                        alt="ikin"
                        style={{ width: "70px" }}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-md-3 col-sm-4">
                      <span>Selamat Datang,</span>
                      <h5></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="daftarArtikel mt-5">
            <div className="row justify-content-center mt-3">
              <h3>Daftar Artikel</h3>
              <div className="col-md-4 col-sm-8 mt-3">
                <div className="card mb-3" style={{ width: "18rem" }}>
                  <img src={imgCard} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <div className="card-category">
                      <span className="badge bg-primary">Bullying</span>
                      <span className="mx-3">Selasa, 7 Maret 2023</span>
                    </div>
                    <h5 className="card-title mt-3">
                      Bullying di Lingkungan Sekolah
                    </h5>
                    <p className="card-text">
                      Bullying di lingkungan sekolah merupakan penindasan
                      sebagai bentuk negatif interaksi sosial yang terjadi di
                      sekolah.
                    </p>
                    <a href="#" className="btn btn-outline-primary">
                      Baca lebih lanjut
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-8">
                <div className="card mb-3" style={{ width: "18rem" }}>
                  <img src={imgCard} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <div className="card-category">
                      <span className="badge bg-primary">Bullying</span>
                      <span className="mx-3">Selasa, 7 Maret 2023</span>
                    </div>
                    <h5 className="card-title mt-3">
                      Bullying di Lingkungan Sekolah
                    </h5>
                    <p className="card-text">
                      Bullying di lingkungan sekolah merupakan penindasan
                      sebagai bentuk negatif interaksi sosial yang terjadi di
                      sekolah.
                    </p>
                    <a href="#" className="btn btn-outline-primary">
                      Baca lebih lanjut
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-8">
                <div className="card mb-3" style={{ width: "18rem" }}>
                  <img src={imgCard} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <div className="card-category">
                      <span className="badge bg-primary">Bullying</span>
                      <span className="mx-3">Selasa, 7 Maret 2023</span>
                    </div>
                    <h5 className="card-title mt-3">
                      Bullying di Lingkungan Sekolah
                    </h5>
                    <p className="card-text">
                      Bullying di lingkungan sekolah merupakan penindasan
                      sebagai bentuk negatif interaksi sosial yang terjadi di
                      sekolah.
                    </p>
                    <a href="#" className="btn btn-outline-primary">
                      Baca lebih lanjut
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </section>
          <section className="RiwayatPelaporan mt-5 mb-3">
            <div className="row">
              <h3>Riwayat Pelaporan</h3>
              <div className="col-md-12 mt-3">
                <div className="card mb-3" style={{ width: "40rem" }}>
                  <div className="card-body">
                    <div className="card-status mb-3">
                      <span className="badge bg-danger">Menunggu</span>
                    </div>
                    <div className="card-category">
                      <span className="badge bg-primary">Bullying</span>
                      <span className="mx-3">Selasa, 7 Maret 2023</span>
                    </div>
                    <h4 className="card-title mt-3">
                      Bullying di Lingkungan Sekolah
                    </h4>
                    <p className="card-text">
                      Bullying di lingkungan sekolah merupakan penindasan
                      sebagai bentuk negatif interaksi sosial yang terjadi di
                      sekolah.
                    </p>
                    <a href="#" className="btn btn-outline-primary">
                      Baca lebih lanjut
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
