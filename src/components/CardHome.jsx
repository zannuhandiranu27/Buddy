import { PropTypes } from "prop-types";

function CardHome({ src, tittle, onClick }) {
  return (
    <>
      <div className="card mb-3" style={{ width: "18rem",
      maxHeight: "300px"
    }}>
        <img src={src} className="card-img-top" alt="..."
        style={{height: "170px"}}
        />
        <div className="card-body row justify-content-center">
          <p className="card-text text-center">{tittle}</p>
          <a
            onClick={onClick}
            className="btn btn-primary"
            style={{
              width: "190px",
            }}
          >
            Baca Selengkapnya
          </a>
        </div>
      </div>
    </>
  );
}

CardHome.propTypes = {
  src: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CardHome;
