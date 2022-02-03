import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  const [res, setRes] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:1337/api/categories/${id}`
        );
        // console.log(`result`, result.data.data);
        setRes(result.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
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
    <div>
      <h1>{res.attributes.name}</h1>
      <h2>{res.attributes.body}</h2>
        
    </div>
  );
};

export default Category;
