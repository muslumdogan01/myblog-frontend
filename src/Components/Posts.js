import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Outlet, Link } from "react-router-dom";

const Posts = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const postResult = await axios.get("http://localhost:1337/api/blogs");
        //console.log('kafası',postResult.data.data);
        setBlogs(postResult.data.data);
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
 
      </div>
    );
  } else if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
  
      </div>
    );
  }


  return (
    <div className="container-fulid">
      <div class="alert alert-primary" role="alert">
        <div className="container">
          <div className="row">
            <div className="col-md-6 px-3 px-md-5 ">
              <h6 className="text-dark fw-bold">Güncel Gönderilerim</h6>
            </div>
            <div className="col-md-6 px-3 px-md-5 ">
              <Link to={`/Blog`}>
              <h6 className=" fw-bold text-center link-secondary">Tümünü Gör</h6>
              </Link>
            </div>
          </div>
          <div className="row">
            {blogs.slice(0, 2).map((item) => {
              // console.log("item :>> ", item);
              return (
                <div className="col-md-6 p-3 p-md-5 " key={item.id}>
                  <div className="card" id="postCard">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="card-title fw-bold">
                          {item.attributes.title}
                        </h6>
                        <h6 className="alert alert-warning">
                          Hayata Dair
                        </h6>
                      </div>
                      <p className="card-text">
                        {item.attributes.body.substring(0, 200)}...
                      </p>
                      <Link to={`/Detail/${item.id}`}>
                        <a className="link-primary fw-bold">Devamını oku...</a>
                      </Link>
                       <div>{item.attributes.createdAt}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
