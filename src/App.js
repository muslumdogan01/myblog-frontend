import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Detail from "./Pages/Detail";
import Blog from "./Pages/Blog";
import Works from "./Pages/Works";
import WorksDetail from "./Components/WorksDetail";
import Hakkimda from "./Pages/Hakkimda";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="Home" element={<Home />} />
          <Route path="Blog" element={<Blog />} />
          <Route path="Category/:id" element={<Category />} />
          <Route path="Detail/:id" element={<Detail />} />
          <Route path="Works" element={<Works />} />
          <Route path="WorksDetail/:id" element={<WorksDetail />} />
          <Route path="Hakkimda" element={<Hakkimda />} />
        </Routes>
      </div>

  );
}

export default App;
