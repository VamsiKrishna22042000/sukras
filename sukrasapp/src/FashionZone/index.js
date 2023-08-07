import FashionZoneCarousel from "../FashionzoneCarousel";
import "./index.css";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import {
  generatePath,
  withRouter,
} from "react-router-dom/cjs/react-router-dom.min";

import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

const FashionZone = (props) => {
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [displayProfile, setProfile] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/videosApi`
    );
    const data = await response.json();
    if (response.ok) {
      setVideos(data.videos);
    }
  };

  const gobackTo = () => {
    const { history } = props;
    history.push("/");
  };

  const settingProfile = () => {
    setProfile(!displayProfile);
  };

  useEffect(() => {
    getAllCategoryOfProducts();
    getAllCartItems();
  }, []);

  const getAllCartItems = async () => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      setCartItems([]);
    } else {
      const response = await fetch(
        `${
          process.env.REACT_APP_ROOT_URL
        }/api/product/getAllProductFromCart/${Cookies.get("jwt_user")}`
      );
      const data = await response.json();

      if (response.ok) {
        setCartItems(data.productCart);
      }
    }
  };

  const getAllCategoryOfProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
    );
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
      setCategories(data.categories);
      setLoad(true);
    }
  };
  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };
  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
  };

  const filterCosmetics = categories.filter(
    (each) => each.type !== "cosmetics"
  );

  return load ? (
    <>
      <div className="sukras-header-fashionzone">
        <img
          onClick={goToSelectCategory}
          className="sukraslogobeauty"
          src="./sukraslogo.png"
          alt="Logo Space"
        />
        <button onClick={gobackTo} className="arrow-btn" type="button">
          <img className="left-arrow-mobile" src="./backarrow.png" />
        </button>
        <button className="location-btnn" type="button">
          <img className="location-mobilee" src="./location-icon.png" />
        </button>
        <select className="dropdown-container">
          <option>Vizianagaram</option>
        </select>
        <button
          onClick={deleteCookie}
          className="notification-btnn"
          type="button"
        >
          <img className="search-mobile" src="./search-mobile.png" />
        </button>

        <button className="user-btn" type="button">
          <img className="user" src="./user.png" />
        </button>
        <button
          onClick={settingProfile}
          className="arrowdown-btn"
          type="button"
        >
          <img className="arrow" src="./arrowdown.png" />
        </button>
        <div className={displayProfile ? "profile-block" : "profile-display"}>
          {Cookies.get("jwt_user") === undefined ? (
            <p
              onClick={() => {
                window.location.href("/login");
              }}
              style={{ marginTop: 5 }}
            >
              Log In
            </p>
          ) : (
            <p onClick={deleteCookie} style={{ marginTop: 5 }}>
              Log Out
            </p>
          )}
          <Link
            style={{ textDecoration: "none", marginTop: 5, marginBottom: 5 }}
            to={`/myorders/myorders/myorders/beautyzone`}
          >
            My Orders
          </Link>
        </div>
        <div className="search-cart">
          <input
            className="serch-cart-input"
            placeholder="Enter keywords, title, author or ISBN "
            type="search"
          />
          <button onClick={deleteCookie} className="search-icon-button">
            <img
              src="./search-icon.png"
              alt="search-icon"
              className="search-icon"
            />
          </button>
          <Link to={`/fashioncart/fashionzone`}>
            <button className="count-of-cart">{cartItems.length}</button>
            <button className="cart-icon-buttonn">
              <img src="./cart.png" alt="cart-icon" className="cart-icon" />
            </button>
          </Link>
        </div>
      </div>
      <div className="sukras-main-beauty">
        <div className="beautyzone-body">
          <FashionZoneCarousel />
        </div>
        <div className="beautyzone-body-2">
          {categories === "" ? (
            <div className="service-spinner">
              <TailSpin color={"#F4BD18"} height={70} width={70} />
            </div>
          ) : (
            <>
              <div className="beauty-cosmetic-head">
                <h1>Our Fashion videos</h1>
              </div>
              <div className="beauty-cosmetic-products3">
                <div className="cosmatic-products-con">
                  {videos.map((each) => (
                    <div className="cosmatic-videoItem">
                      <iframe
                        style={{ cursor: "pointer" }}
                        className="cosmatic-productImg"
                        width="560"
                        height="315"
                        src={each.link}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen="true"
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
              <div className="our-services">
                <p className="our-services-head">Find Your Fashion</p>
                {filterCosmetics.map((each) => (
                  <Link to={`/fashioncategory/${each.type}`}>
                    <button
                      key={each._id}
                      className="our-services-btn"
                      id={each._id}
                      type="button"
                    >
                      <img
                        className="our-services-img"
                        src={`${each.image}`}
                        alt={each.categoryImage}
                      />
                      <p
                        style={{ textTransform: "capitalize" }}
                        className="our-services-name"
                      >
                        {each.type}
                      </p>
                    </button>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default FashionZone;
