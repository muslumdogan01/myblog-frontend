import React, { useState, useEffect } from "react";
import axios from "axios";
import { withDomain } from "../utils";

const Hakkimda = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await axios.get(
          "http://localhost:1337/api/about/?populate=aboutpic"
        );
        console.log("hakımda", result.data.data);
        const newDataAbout = {
          ...result.data.data.attributes,
          aboutPicture: `http://localhost:1337${result.data.data.attributes.aboutpic.data.attributes.url}`,
        };
        console.log("newDataAbout", newDataAbout);
        setAbout(newDataAbout);
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
      <div
        className="card text-dark bg-light mb-3 mt-5"
        style={{ maxWidth: "100%" }}
      >
        <div className="card-header text-center">
        <img src={about.aboutPicture} alt="" style={{ maxWidth: "30%" }}/>
        </div>
        <div className="card-body">
          <h1 className="alert alert-danger">Hakkımda</h1>
          <h4 className="card-text">{about.abouttext}</h4>
          <h3 className="mt-3 fw-bold">Peki ya kişisel özelliklerim neler?</h3>
          <h4 className="card-text mt-3">{about.hobbies}</h4>
        </div>
      </div>
    </div>
  );
};

export default Hakkimda;
