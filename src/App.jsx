import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TentangKami from "./pages/TentangKami";
import Artikel from "./pages/Artikel";
import DetailArtikel from "./pages/DetailArtikel";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import FormPelaporan from "./pages/FormPelaporan";
import Create from "./pages/admin/artikel/create";
import Update from "./pages/admin/artikel/update";
import EditProfil from "./pages/EditProfil";
import DashboardNotFound from "./components/DashboardNotFound";
import Preview from "./pages/admin/artikel/preview";
import UserDashbaord from "./pages/userDashboard";
import Datapelaporan from "./pages/admin/artikel/datapelaporan";
import Prosespelaporan from "./pages/admin/artikel/prosespelaporan";
import Riwayatpelaporan from "./pages/admin/artikel/riwayatpelaporan";
import ReportDetails from "./pages/admin/artikel/ReportDetails"; // Import ReportDetails component
import ChangePassword from "./pages/ChangePassword"; // Import ChangePassword component

function App() {
  const store = useSelector((state) => state.users);
  return (
    <BrowserRouter>
      {store.authStatus ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tentangKami" element={<TentangKami />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/detail/:id" element={<DetailArtikel />} />
          <Route path="/formLaporan" element={<FormPelaporan data="send" />} />
          <Route path="/profile" element={<EditProfil />} />
          <Route path="/change-password" element={<ChangePassword />} /> {/* Add route for ChangePassword */}
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/artikel/create" element={<Create />} />
          <Route path="/admin/artikel/update/:id" element={<Update />} />
          <Route path="/admin/artikel/preview/:id" element={<Preview />} />
          <Route path="/admin/datapelaporan" element={<Datapelaporan />} />
          <Route path="/admin/prosespelaporan" element={<Prosespelaporan />} />
          <Route path="/admin/riwayatpelaporan" element={<Riwayatpelaporan />} />
          <Route path="/admin/laporan/:id" element={<ReportDetails />} /> {/* Add route for ReportDetails */}
          <Route path="/dashboard" element={<UserDashbaord />} />
          <Route path="*" element={<DashboardNotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tentangKami" element={<TentangKami />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/detail/:id" element={<DetailArtikel />} />
          <Route path="/formLaporan" element={<FormPelaporan />} />
          <Route path="*" element={<DashboardNotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
