import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import ReactQuill from "react-quill"; // Import ReactQuill for rich text editing
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import withReactContent from "sweetalert2-react-content"; // Import for React integration with SweetAlert2

const MySwal = withReactContent(Swal); // Wrap Swal with React content

function FormArtikelAdmin({ onSubmit }) {
  const [value, setValue] = useState({
    categori: "",
    createdAt: "",
    image_source: "",
    title: "",
    excerpt: "",
    description: "",
  });
  const [editorValue, setEditorValue] = useState(""); // State to store rich text editor content

  useEffect(() => {
    // Update 'description' in 'value' whenever 'editorValue' changes
    if (value.description !== editorValue) {
      setValue((prevState) => ({
        ...prevState,
        description: editorValue,
      }));
    }
  }, [editorValue]);

  const handleSubmit = () => {
    // Handle form submission
    onSubmit(value); // Pass 'value' state to parent component onSubmit handler
    setValue({
      categori: "",
      createdAt: "",
      image_source: "",
      title: "",
      excerpt: "",
      description: "",
    }); // Clear form inputs after submission
    MySwal.fire("Success!", "Successfully added some Article.", "success"); // Show success message using SweetAlert2
    setEditorValue(""); // Clear rich text editor content
  };

  const handleChange = (e) => {
    // Handle input change for text inputs
    const { name, value } = e.target;

    // Ensure title does not exceed 55 characters
    if (name === "title" && value.length > 55) {
      e.target.value = value.slice(0, 55);
    }

    setValue((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleQuillChange = (content) => {
    // Handle change in rich text editor content
    setEditorValue(content); // Update 'editorValue' state with the new content
  };

  const modules = {
    // Configuration for ReactQuill modules
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], ["clean"]],
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Kategori</label>
          <input type="text" className="form-control mt-2" id="categori" name="categori" placeholder="masukkan kategori" value={value.categori} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" className="form-control mt-2" id="createdAt" name="createdAt" placeholder="masukkan tanggal" value={value.createdAt} onChange={handleChange} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control mt-2" id="title" placeholder="masukkan title" name="title" value={value.title} onChange={handleChange} maxLength={55} />
          <small className="text-muted">{value.title.length}/55 characters</small>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="text" className="form-control mt-2" id="image_source" name="image_source" value={value.image_source} onChange={handleChange} placeholder="masukkan url image" />
        </div>
      </div>
      <div className="form-group mt-3">
        <label>Excerpt</label>
        <div className="form-floating ">
          <textarea className="form-control" placeholder="masukkan deskripsi singkat" id="excerpt" name="excerpt" value={value.excerpt} onChange={handleChange} style={{ height: "100px" }}></textarea>
        </div>
      </div>
      <div className="form-group mt-3">
        <label>Description</label>
        <div className="form-floating ">
          <ReactQuill theme="snow" id="description" name="description" placeholder="masukkan deskripsi" style={{ height: "300px", marginBottom: "50px" }} value={editorValue} onChange={handleQuillChange} modules={modules} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          {/* Button to submit form */}
          <button className="btn btn-primary" onClick={handleSubmit}>
            simpan
          </button>
        </div>
      </div>
    </div>
  );
}

FormArtikelAdmin.propTypes = {
  onSubmit: PropTypes.func.isRequired, // PropTypes validation for onSubmit function prop
};

export default FormArtikelAdmin;
