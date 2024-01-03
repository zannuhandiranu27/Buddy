import { PropTypes } from "prop-types";

function CardArtikel({img, kategori, date, tittle, excerpt,onClick}) {
  const truncatedExcerpt = excerpt.length > 50 ? `${excerpt.substring(0, 50)}...` : excerpt;
  return (
    <div className="card cardList mb-3" style={{ width: "18rem",
    height: "28rem"
    }}>
    <img src={img} className="card-img-top" alt="..."
  
    />
    <div className="card-body">
      <div className="card-category">
        <span className="badge bg-primary">{kategori}</span>
        <span className="mx-3">{date}</span>
      </div>
      <h6 className="card-title mt-3">
        {tittle}
      </h6>
      <p className="card-text">
        {truncatedExcerpt}
      </p>
    </div>
      <div className="card-readmore px-2 pb-3">
      <a className="btn btn-outline-primary" onClick={onClick}>
        Baca lebih lanjut
      </a>
      </div>
  </div>
  )
}

CardArtikel.propTypes = {
  img: PropTypes.string.isRequired,
  kategori: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CardArtikel