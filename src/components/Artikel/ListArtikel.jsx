import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/Artikel.css";
import CardArtikel from "../CardArtikel";
import { useEffect, useState } from "react";
import { getArtikel, searchByKeyword, resetFilter } from "../../redux/reducer/artikelReducer";
import HighlightArtikel from "../HighlightArtikel";
import FilterArtikel from "../FilterArtikel";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function ListArtikel() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { artikel, filterCategory, isLoading } = useSelector((state) => state.artikel);

  const ITEMS_PER_PAGE = 6;
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalItems = artikel.length;
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedArtikel = artikel.slice(startIndex, endIndex);

  const higlightedArtikel = artikel.find((item) => item.categorihg === "true");
  const filteredCategory = filterCategory === "all" ? displayedArtikel : displayedArtikel.filter((item) => item.categori === filterCategory);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber.selected + 1);
  };

  useEffect(() => {
    dispatch(getArtikel());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(resetFilter());
    } else {
      dispatch(searchByKeyword(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const handleDetail = (id) => {
    navigation(`/detail/${id}`);
  };

  if (isLoading) {
    return <p>Loading articles. . . </p>;
  }

  return (
    <>
      <FilterArtikel setSearchTerm={setSearchTerm} />
      {higlightedArtikel && (
        <HighlightArtikel
          imgHg={higlightedArtikel.image_source}
          categori={higlightedArtikel.categori}
          date={higlightedArtikel.createdAt}
          title={higlightedArtikel.title}
          excerpt={higlightedArtikel.excerpt}
          onClick={() => handleDetail(higlightedArtikel.id)}
        />
      )}
      <div className="container">
        <div className="row justify-content-center">
          <h3>Artikel Terbaru</h3>
          {filteredCategory.map((item) => (
            <div className="col-lg-4 col-md-5 col-sm-12" key={item.id}>
              <CardArtikel img={item.image_source} kategori={item.categori} date={item.createdAt} tittle={item.title} excerpt={item.excerpt} onClick={() => handleDetail(item.id)} />
            </div>
          ))}
        </div>
        <ReactPaginate pageCount={Math.ceil(totalItems / ITEMS_PER_PAGE)} pageRangeDisplayed={5} marginPagesDisplayed={2} onPageChange={handlePageChange} containerClassName="pagination" activeClassName="active" />
      </div>
    </>
  );
}

export default ListArtikel;
