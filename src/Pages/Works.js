import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { withDomain } from "../utils/index";

const Works = () => {
  const [featureItems, setFeatureItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const workResult = await (
          await axios.get("http://localhost:1337/api/works/?populate=workImage")
        ).data;

        console.log("work", workResult.data);
        setFeatureItems(workResult.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
      <div className="alert alert-danger text-center" role="alert">
        <h1 className="text-dark fw-bold">ERROR...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center align-items-center p-5">
        <h1
          className="card mb-5 border-0 fw-bold"
          style={{ maxWidth: "1000px" }}
        >
          Works
        </h1>
        {featureItems.map((item) => (
          <div
            className="card mb-3 d-flex pb-5 border-0 border-bottom "
            style={{ maxWidth: "1000px" }}
            key={item.id}
          >
            <div className="row g-0 d-flex justify-content-center align-items-center ">
              <div className="col-md-4">
                <img
                  src={withDomain(
                    item.attributes.workImage.data.attributes.url
                  )}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.attributes.title}</h5>
                  <p className="card-text">
                    {item.attributes.description.substring(0, 100)}...
                  </p>
                  <p className="card-text">
                    <Link to={`/WorksDetail/${item.id}`}>
                      <a className="text-muted">Detail..</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;

/**
 * id number
 * attributes :{
 * title: string
 * description: string
 * name: string
 * workImage: {
 * uri: string "/uploads/1_70a15996c7.png",
 * }
 * }
 */
