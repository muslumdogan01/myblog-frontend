import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const WorksDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDataworks() {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:1337/api/works/${id}`);
        console.log("gör", res.data.data.attributes);
        setDetail(res.data.data.attributes);

        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchDataworks();
  }, [id]);

  return (
    <div className="container">
      <div className="row py-5">
        <div class="card p-3" key={detail.id}>
          <div class="card-header">{detail.title}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{detail.description}</p>
              <footer class="blockquote-footer">
                <p>{detail.name}</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksDetail;
