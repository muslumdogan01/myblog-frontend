import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:1337/api/categories");
        setCategories(result.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="Home" className="navbar-brand">
          <span>Müslüm Doğan</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
            <li className="nav-item">
              <Link to="/Home" className="nav-link active" aria-current="page">
                Anasayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Hakkimda"
                className="nav-link active"
                aria-current="page"
              >
                Hakkımda
              </Link>
            </li>


            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle "
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kategoriler
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to={`/Blog`} className="dropdown-item">
                  <a className="dropdown-item">Hayata Dair</a>
                </Link>
                <Link to={`/Works`} className="dropdown-item">
                  <a className="dropdown-item">Çalışmalarım</a>
                </Link>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
