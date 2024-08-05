import SideNavbar from "../components/SideNavbar";
import "../assets/css/Laporan.css"; // Import CSS

function AdminLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100 flex-column flex-md-row">
        <SideNavbar />
        <section className="main col py-3">
          <div className="container">{children}</div>
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
