import { PropTypes } from "prop-types";

function CardHome({ src, tittle, onClick }) {
  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img src={src} className="card-img-top" alt="..." style={{ height: "170px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: "200px" }}>
        <p className="card-text text-center">{tittle}</p>
        <a onClick={onClick} className="btn btn-primary align-self-center" style={{ width: "100%" }}>
          Baca Selengkapnya
        </a>
      </div>
    </div>
  );
}

CardHome.propTypes = {
  src: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardHome;
