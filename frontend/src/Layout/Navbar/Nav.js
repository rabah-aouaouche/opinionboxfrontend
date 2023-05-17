import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import axios from "../../api/axios";

function Nav() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const logout = (e) => {
    const user = localStorage.getItem("User");
    setAuth({ _id: null, accessToken: null });
    if (user) localStorage.removeItem("User");

    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-xl shadow_base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">
                <a>Homepage</a>
              </Link>
            </li>
            <li>
              <Link to="/articles">
                <a>Articles</a>
              </Link>
            </li>
            <li>
              <Link to="/about-us">
                <a>About Us</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <a className="btn btn-ghost normal-case text-2xl font-bold">
            OpinionBox
          </a>
        </Link>
      </div>
      <div className="navbar-end">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-sm w-full max-w-xs border-black "
          />
        </div>
        {auth.token ? (
          <button className="btn btn-active btn-link" onClick={logout}>
            logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-active btn-link">Log in</button>
            </Link>
            <Link to="/signup">
              <button class="btn btn-outline btn-sm">Sign up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
