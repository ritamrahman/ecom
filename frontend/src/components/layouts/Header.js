import React from "react";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  return (
    <>
      <nav className="navbar row">
        {/* logo */}
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <NavLink to="/">
              <img src="/images/shopit_logo.png" />
            </NavLink>
          </div>
        </div>
        {/* search field */}
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        {/* right menu */}
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">
            Login
          </button>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </>
  );
}
