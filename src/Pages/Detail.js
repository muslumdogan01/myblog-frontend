import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:1337/api/blogs/${id}`);
        setResult(res.data.data.attributes);
        
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div class="alert alert-danger text-center" role="alert">
        <h1 className="text-dark fw-bold">ERROR...</h1>
      </div>
    );
  }

  return (
    <div className="card-group p-3" key={result.id}>
      <div className="card text-center">
        <div className="card-body p-5">
          <h2 className="card-title mb-3">{result.author}</h2>
          <h5 className="card-title mb-3">{result.title}</h5>
          <p className="card-text mb-3">{result.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
