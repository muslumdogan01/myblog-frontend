import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { AiOutlineArrowRight } from 'react-icons/ai';

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const profileResult = await axios.get(
          "http://localhost:1337/api/blog-data/?populate=profileImage"
        );
        console.log(
          "home",
          profileResult.data.data.attributes.profileImage.data.attributes.url
        );

   
        const newData = {
          ...profileResult.data.data.attributes,
          profileImage: `http://localhost:1337${profileResult.data.data.attributes.profileImage.data.attributes.url}`,
        };
        // console.log(`newData`, newData);
        setProfile(newData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);



  return (
    <div className="container ">
      <div className="row ">
        <div className="col-md-6 p-3 p-md-5 ">
          <h1 className="fw-bold">
            {profile.profileTextFirst} <br />
            {profile.profileSecontText}
          </h1>
          <p>
            {profile.profileSubHeader}
          </p>
          <div>
            <Link to={`/Hakkimda`}>
            <button type="button" className="btn btn-danger btn-md">
              Hakkımda daha fazlası   <AiOutlineArrowRight /> 
            </button>
            </Link>
          </div>
        </div>
        <div className="col-md-6 d-flex p-5 justify-content-center align-self-center">
          <div className="text-center">
            <img
              src={profile.profileImage}
              id="profile_photo"
              className="img-fluid img-thumbnail"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
