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

const OtherServices = [
  {
    _id: uuidv4(),
    categoryImage: "FemaleHairSalon.png",
    category: "FemaleHairSalon",
  },
  { _id: uuidv4(), categoryImage: "FemaleSpa.png", category: "FemaleSpa" },
  {
    _id: uuidv4(),
    categoryImage: "MaleGrooming.png",
    category: "MaleGrooming",
  },
  { _id: uuidv4(), categoryImage: "MaleMassage.png", category: "MaleMassage" },
  {
    _id: uuidv4(),
    categoryImage: "PreBridalPackages.png",
    category: "PreBridalPackages",
  },
  {
    _id: uuidv4(),
    categoryImage: "SaloneAtHome.png",
    category: "SaloneAtHome",
  },
  {
    _id: uuidv4(),
    categoryImage: "AtHomeMakeup.png",
    category: "AtHomeMakeup",
  },
  { _id: uuidv4(), categoryImage: "LEDFacial.png", category: "LEDFacial" },
  { _id: uuidv4(), categoryImage: "HomeNails.png", category: "HomeNails" },
];

const FashionZone = (props) => {
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [categoryImg, setCategoryImg] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [displayProfile, setProfile] = useState(false);

  const gobackTo = () => {
    const { history } = props;
    history.push("/select-category");
  };

  const settingProfile = () => {
    setProfile(!displayProfile);
  };

  useEffect(() => {
    getAllCategoryOfProducts();
    getAllCartItems();
  }, []);

  const getAllCartItems = async () => {
    const response = await fetch(
      `https://sukras.onrender.com/api/product/getAllProductFromCart/${Cookies.get(
        "jwt_user"
      )}`
    );
    const data = await response.json();

    if (response.ok) {
      setCartItems(data.productCart);
    }
  };

  const getAllCategoryOfProducts = async () => {
    const response = await fetch(
      "https://sukras.onrender.com/api/admin/getAllCategory"
    );
    const data = await response.json();
    if (response.ok === true) {
      setCategories(data.categories);
      setLoad(true);
    }
  };
  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/select-category");
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
          <option>Hyderabad</option>
        </select>
        <button
          onClick={deleteCookie}
          className="search-btn-fashion"
          type="button"
        >
          <img className="search-mobile" src="./search-mobile.png" />
        </button>
        <button className="notification-btnn" type="button">
          <img
            className="notification-mobile"
            src="./notification-mobile.png"
          />
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
        <Link
          to={`/myorders/myorders/myorders/fashionzone`}
          className={displayProfile ? "profile-block2" : "profile-display"}
        >
          <p>My Orders</p>
        </Link>
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
              {" "}
              <TailSpin color={"#F4BD18"} height={70} width={70} />
            </div>
          ) : (
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
