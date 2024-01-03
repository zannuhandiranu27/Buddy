import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import ReactQuill from "react-quill";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function FormArtikelAdmin({ onSubmit }) {
  const [value, setValue] = useState({
    categori: "",
    createdAt: "",
    image_source: "",
    title: "",
    excerpt: "",
    description: "",
  });
   const [editorValue, setEditorValue] = useState("")

  useEffect(() => {
    if(value.description !== editorValue){
      setValue((prevState)=> ({
        ...prevState,
        description: editorValue
      }))
    }
  }, [editorValue]);

  const handleSubmit = () => {
    onSubmit(value);
    setValue({
      categori: "",
      createdAt: "",
      image_source: "",
      title: "",
      excerpt: "",
      description: "",
    })
    MySwal.fire(
      'Success!',
      'Succesfully added some Article.',
      'success'
    )
    setEditorValue("")
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    setEditorValue(content)
  }

  const getText = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
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
            placeholder="masukkan kategori"
            value={value.categori}
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
            placeholder="masukkan tanggal"
            value={value.createdAt}
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
            value={value.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            className="form-control mt-2"
            id="image_source"
            name="image_source"
            value={value.image_source}
            onChange={handleChange}
            placeholder="masukkan url image"
          />
        </div>
      </div>
      <div className="form-group mt-3">
        <label>Excerpt</label>
        <div className="form-floating ">
          <textarea
          className="form-control"
          placeholder="masukkan deskripsi singkat"
          id="excerpt"
            name="excerpt"
            value={value.excerpt}
            onChange={handleChange}
          style={{ height: "100px" }}
        ></textarea>
          {/* <ReactQuill
            theme="snow"
            id="excerpt"
            name="excerpt"
            value={value.excerpt}
            onChange={handleQuillChange}
            modules={modules}
          /> */}
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
            value={value.description}
            onChange={handleChange}
          style={{ height: "100px" }}
        ></textarea> */}
          <ReactQuill
            theme="snow"
            id="description"
            name="description"
            placeholder="masukkan deskripsi"
            style={{ height: "300px",marginBottom: "50px" }}
            value={editorValue}
            onChange={handleQuillChange}
            modules={modules}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={handleSubmit}>
            simpan
          </button>
        </div>
      </div>
    </div>
  );
}

FormArtikelAdmin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default FormArtikelAdmin;
