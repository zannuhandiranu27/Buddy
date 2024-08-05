import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PropTypes } from "prop-types";
import { updateArtikel } from '../redux/reducer/artikelReducer';
import ReactQuill from "react-quill";

function UpdateFormArtikelAdmin({onSubmit}) {
    const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artikel } = useSelector((state) => state.artikel);
    const [formData, setFormData] = useState({
        categori: '',
        createdAt: '',
        title: '',
        image_source: '',
        excerpt: '',
        description: ''
        });

        const handleChange = (e) => {
            setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: e.target.value,
            }));
          };

          const handleQuillChange = (content) => {
            setFormData((prevState) => ({
              ...prevState,
              description: content,
              excerpt: getText(content).substring(0, 100),
            }));
          }
          const getText = (html) => {
            const tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
          };
          const handleSubmit = () => {
            dispatch(updateArtikel(id, formData));
            navigate("/admin/artikel");
          };

          const modules = {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [ { list: "ordered" }, { list: "bullet" } ],
              ["link", "image"],
              ["clean"],
            ],
            
          }

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
    <div className="row">
    <div className="col-md-6">
      <div className="form-group">
        <label>Kategori</label>
        <input
          type="text"
          className="form-control mt-2"
          id="categori"
          name="categori"
          value={formData.categori}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="text"
          className="form-control mt-2"
          id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
        />
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control mt-2"
          id="title"
            placeholder="masukkan title"
            name="title"
            value={formData.title}
            onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Image</label>
        <input
          type="text"
          className="form-control mt-2"
          id="image"
            name="image"
            value={formData.image_source}
            onChange={handleChange}
          placeholder="masukkan url image"
        />
      </div>
    </div>
    <div className="form-group mt-3">
      <label>Excerpt</label>
      <div className="form-floating ">
        {/* <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          style={{ height: "100px" }}
        ></textarea> */}
         <ReactQuill
            theme="snow"
            id="description"
            name="description"
            value={formData.excerpt}
            onChange={handleQuillChange}
            modules={modules}
          />
      </div>
    </div>
    <div className="form-group mt-3">
      <label>Description</label>
      <div className="form-floating ">
        {/* <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          style={{ height: "100px" }}
        ></textarea> */}
         <ReactQuill
            theme="snow"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleQuillChange}
            modules={modules}
          />
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
  )
}

UpdateFormArtikelAdmin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default UpdateFormArtikelAdmin