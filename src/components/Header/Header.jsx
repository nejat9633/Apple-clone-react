import React from 'react'
import logo from '../../images/icons/logo-sm.png'
import search from "../../images/icons/search-icon-sm.png";
import cart from "../../images/icons/cart-sm.png";
import styles from './Header.module.css'
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div className={`fixed-top ${styles["nav-wrapper"]}`}>
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-toggleable-sm ">
         
          <button
            className="navbar-toggler navbar-toggler-right white"
            type="button"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            ☰
          </button>
          <Link className="navbar-brand mx-auto" to="/">
            <img src={logo} />
          </Link>

          <div className="navbar-collapse collapse">
            <ul className="navbar-nav nav-justified w-100 nav-fill">
              <li className={`${styles["nav-item"]} nav-item `}>
                <Link className="nav-link js-scroll-trigger" to="#">
                  Mac
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
                <Link className="nav-link js-scroll-trigger" to="/iphone">
                  iphone
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
                <Link className="nav-link js-scroll-trigger" to="#">
                  ipad
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
                <Link className="nav-link js-scroll-trigger" to="#">
                  watch
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
                <Link className="nav-link js-scroll-trigger" to="#">
                  tv
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
                <Link className="nav-link js-scroll-trigger" href="#">
                  Music
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
               <Link className="nav-link js-scroll-trigger" href="#">
                  Support
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
               <Link className="nav-link js-scroll-trigger" to="/search/">
                  <img src={search} />
                </Link>
              </li>
              <li className={`${styles["nav-item"]} nav-item `}>
                <Link className="nav-link js-scroll-trigger" to="/cart/">
                  <img src={cart} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );

}

export default Header