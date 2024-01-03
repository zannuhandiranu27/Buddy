import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/DashboardAdmin.css';
import iconDb from "../assets/img/icon_db.png";
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducer/userReducer';
import Cookies from 'universal-cookie';

const ToolsCookies = new Cookies();

function SideNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Lakukan logika logout di sini
    // Contoh sederhana: Mengatur isLoggedIn menjadi false dan menghapus userName
    dispatch(logout());
    navigate('/login');
    ToolsCookies.remove('user_data', { path: '/' })
    ToolsCookies.remove('status_login', { path: '/' })

  };

  return (
    <>
      <aside className="col-12 col-md-3 col-xl-2 p-0 sideNav ">
        <nav
          className="navbar navbar-expand-md navbar-light  flex-md-column flex-row align-items-center py-2 text-center sticky-top  "
          id="sidebar"
        >
          <div className="text-center p-3">
            <a
              href="/admin"
              className="navbar-brand mx-0 font-weight-bold  text-nowrap text-light"
            >
              BUDDY
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-column mb-sm-auto mb-0 align-items-start px-2 align-items-sm-start mt-5">
              <li className="nav-item">
                <a href="/admin" className="nav-link align-middle px-4">
                  <i className="fa-solid fa-house">
                    <span className="ms-1 d-sm-inline">Dashboard</span>
                  </i>
                </a>
                <a href="/admin/datapelaporan" className="nav-link align-middle px-4">
                  <i className="fa-solid fa-house">
                    <span className="ms-1 d-sm-inline">Data Pelaporan</span>
                  </i>
                </a>
                <a href="/admin/prosespelaporan" className="nav-link align-middle px-4">
                  <i className="fa-solid fa-house">
                    <span className="ms-1 d-sm-inline">Proses Pelaporan</span>
                  </i>
                </a>
                <a href="/admin/riwayatpelaporan" className="nav-link align-middle px-4">
                  <i className="fa-solid fa-house">
                    <span className="ms-1 d-sm-inline">Riwayat Pelaporan</span>
                  </i>
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <span className="d-none d-sm-inline mx-1 sinau">admin</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><a className="dropdown-item" onClick={handleLogout}>Sign out</a></li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default SideNavbar;
