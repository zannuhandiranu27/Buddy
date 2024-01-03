import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArtikel,
  getArtikel,
} from "../../../redux/reducer/artikelReducer";
import ListArtikelAdmin from "../../../components/ListArtikelAdmin";
import '../../../assets/css/DashboardAdmin.css'
import { NavLink, useNavigate } from "react-router-dom";
import iconDb from "../../../assets/img/icon_db.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artikel } = useSelector((state) => state.artikel);

  useEffect(() => {
    dispatch(getArtikel());
  }, [dispatch]);

  const handleUpdateArtikel = (id) => {
    navigate(`/admin/artikel/update/${id}`);
  };
  const handleDeleteArtikel = (id) => {
    MySwal.fire({
      title: "Are you sure want to delete this article?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        dispatch(deleteArtikel(id));
        MySwal.fire("Deleted!", "Your article has been deleted.", "success");
      }
    });
  };
  const handlePreviewArtikel = (id) => {
   navigate(`/admin/artikel/preview/${id}`) 
  }


  return (
    <>
      <div className="row">
        <div className="col-md-12 col-sm-12 col-lg-12">
          <div className="row">
            <div className="col-md-6 text-start py-2">
              <a href="#" className="btn_db">
                <img src={iconDb} alt="" className="px-2" />
              </a>
              <span className="heading-dashboard">Dashboard Admin</span>
            </div>
            <div className="parallax">
              <div className="parallax-heading mb-3">
                <h2 className="">List Artikel</h2>
                <NavLink to="/admin/artikel/create">
                  <button className="btn btn-primary mb-2">
                    Tambah Artikel
                  </button>
                </NavLink>
              </div>
              <div className="table">
            <ListArtikelAdmin
            artikel={artikel}
            onUpdateArtikel={handleUpdateArtikel}
            onDeleteArtikel={handleDeleteArtikel}
            onPreviewArtikel={handlePreviewArtikel}
            />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
