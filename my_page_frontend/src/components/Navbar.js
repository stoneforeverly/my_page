import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">我的博客</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">首页</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">写文章</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">关于我</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;