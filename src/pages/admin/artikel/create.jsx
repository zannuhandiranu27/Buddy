import { useEffect } from "react";
import AdminLayout from "../../../layout/AdminLayout";
import FormArtikelAdmin from "../../../components/FormArtikelAdmin";
import { useDispatch } from "react-redux";
import {
  createArtikel,
  getArtikel,
} from "../../../redux/reducer/artikelReducer";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtikel());
  }, []);

  const handleCreateArtikel = (data) => {
    dispatch(createArtikel(data));
    navigate("/admin/artikel");
  };

  return (
    <>
      <AdminLayout>
        <div className="parallax">
          <div className="parralax-heading">
            <h1>Create Artikel</h1>
            <FormArtikelAdmin onSubmit={handleCreateArtikel} />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Create;
