import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../../layout/AdminLayout";
import { updateArtikel } from "../../../redux/reducer/artikelReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Sweet alert with react content
const MySwal = withReactContent(Swal);

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artikel } = useSelector((state) => state.artikel);
  const [formData, setFormData] = useState({
    categori: "",
    createdAt: "",
    title: "",
    image_source: "",
    excerpt: "",
    description: "",
  });

  const handleChange = (e) => {
    // Ensure title does not exceed 55 characters
    if (e.target.name === "title" && e.target.value.length > 55) {
      e.target.value = e.target.value.slice(0, 55);
    }

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuillChange = (content) => {
    setFormData((prevState) => ({
      ...prevState,
      description: content,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateArtikel(id, formData));
    MySwal.fire("Success!", "Your todo has been updated.", "success");
    navigate("/admin/artikel");
  };

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], ["clean"]],
  };

  useEffect(() => {
    const currentArtikel = artikel.find((item) => item.id === id);
    if (currentArtikel) {
      setFormData({
        title: currentArtikel.title,
        description: currentArtikel.description,
        categori: currentArtikel.categori,
        createdAt: currentArtikel.createdAt,
        image_source: currentArtikel.image_source,
        excerpt: currentArtikel.excerpt,
      });
    }
  }, [artikel, id]);

  return (
    <AdminLayout>
      <div className="parallax">
        <div className="parralax-heading">
          <h1>Update Artikel</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Kategori</label>
                <input type="text" className="form-control mt-2" id="categori" name="categori" value={formData.categori} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control mt-2" id="createdAt" name="createdAt" value={formData.createdAt} onChange={handleChange} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control mt-2" id="title" placeholder="masukkan title" name="title" value={formData.title} onChange={handleChange} maxLength={55} />
                <small className="text-muted">{formData.title.length}/55 characters</small>
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="image_source"
                  name="image_source"
                  value={formData.image_source}
                  onChange={handleChange}
                  placeholder="masukkan url image"
                  style={{
                    maxHeight: "100px",
                  }}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label>Excerpt</label>
              <div className="form-floating ">
                <textarea className="form-control" placeholder="Leave a comment here" id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} style={{ height: "100px" }}></textarea>
              </div>
            </div>
            <div className="form-group mt-3">
              <label>Description</label>
              <div className="form-floating ">
                <ReactQuill theme="snow" id="description" name="description" value={formData.description} onChange={handleQuillChange} modules={modules} />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Update;
