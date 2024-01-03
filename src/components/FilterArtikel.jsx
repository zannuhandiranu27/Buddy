import { useDispatch } from "react-redux";
import "../assets/css/Artikel.css";
import { filterCategory, searchByKeyword } from "../redux/reducer/artikelReducer";
import { useState } from "react";

function FilterArtikel() {

  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  

const handleCategoryClick = (category) => {
 dispatch(filterCategory(category))
}

const handleSearch = () => {
  dispatch(searchByKeyword(keyword))
}


  return (
    <>
      <section className="FilterArtikel">
        <div className="container">
          <nav className="navbar navbar-filter navbar-expand-lg">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand p-3">Kategori:</a>
            <div
              className="collapse navbar-collapse p-3"
              id="navbarTogglerDemo03"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-3">
                  <button className="badge text-bg-light" type="submit"
                  onClick={() => handleCategoryClick('all')}
                  >
                    All
                  </button>
                </li>
                <li className="nav-item px-3">
                  <button className="badge text-bg-light" type="submit"
                  onClick={() => handleCategoryClick('bullying')}
                  >
                    Bullying
                  </button>
                </li>
                <li className="nav-item px-3">
                  <button className="badge text-bg-light" type="submit"
                  onClick={() => handleCategoryClick('cyber bullying')}
                  >
                    Cyber Bullying
                  </button>
                </li>
                <li className="nav-item px-3">
                  <button className="badge text-bg-light" type="submit"
                  onClick={() => handleCategoryClick('verbal bullying')}
                  >
                    Verbal Bullying
                  </button>
                </li>
              </ul>
              <form className="d-flex">
                <div className="input-group ">
                  <input
                    className="form-control"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />

                  <span className="input-group-text " onClick={handleSearch}>
                    <i className="fas fa-search" id="show_eye"></i>
                  </span>
                </div>
              </form>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}

export default FilterArtikel;
