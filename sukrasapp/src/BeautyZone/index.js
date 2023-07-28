import "./index.css";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import Carousel from "../Carousel/index";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

const Ivideos = [
  { id: uuidv4(), videoUrl: "https://www.youtube.com/embed/dB_ieBke6U0" },
  { id: uuidv4(), videoUrl: "https://www.youtube.com/embed/8_Laf1DMDe4" },
  { id: uuidv4(), videoUrl: "https://www.youtube.com/embed/NmrM6tKKLko" },
  { id: uuidv4(), videoUrl: "https://www.youtube.com/embed/4YncgbGK9wg" },
  { id: uuidv4(), videoUrl: "https://www.youtube.com/embed/2y3yo9a7BD4" },
  { id: uuidv4(), videoUrl: "https://www.youtube.com/embed/NTmX7Y7vknA" },
  { id: uuidv4(), videoUrl: "https://www.youtube.com/embed/Q3-IteS9ozs" },
];

const Beautyzone = (props) => {
  const [categories, setCategories] = useState("");
  const [load, setLoad] = useState(false);
  const [categoryImg, setCategoryImg] = useState("");
  const [products, setallProducts] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [displayProfile, setProfile] = useState(false);

  useEffect(() => {
    getCartItems();
  }, []);

  const settingProfile = () => {
    setProfile(!displayProfile);
  };

  const getCartItems = async () => {
    if (
      Cookies.get("jwt_user") === undefined &&
      Cookies.get("jwt_token") === undefined
    ) {
      setItemsInCart([]);
    } else {
      const response = await fetch(
        `${
          process.env.REACT_APP_ROOT_URL
        }/api/salon/getAllServicesFromCart/${Cookies.get("jwt_user")}`
      );
      const data = await response.json();
      setItemsInCart(data.cart);
    }
  };

  const getTheCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`
    );
    const data = await response.json();

    if (response.ok === true) {
      getCartItems();
      setLoad(true);
      setCategories(data.salons[0].categories);
      /*console.log(data.salons[0].categories)*/
      const service = data.salons[0].categories.map((each) => each.services);
      const service2 = service.map((each) => each[0].image[0]);
      setCategoryImg(service2);
      /*console.log(service)*/
    }
  };

  useEffect(() => {
    getTheCategories();
    getAllOFtheProducts();
  }, []);

  const getAllOFtheProducts = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllProduct`
    );
    const da = await res.json();
    if (res.ok) {
      setallProducts(da.products);
      setLoad(true);
    }
  };

  const goToSelectCategory = () => {
    const { history } = props;
    history.push("/");
  };

  const gobackTo = () => {
    const { history } = props;
    history.push("/");
  };

  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
  };

  const filterdProductsBasedOnType = products.filter(
    (each) => each.type === "cosmetics"
  );

  return load ? (
    <>
      <div className="sukras-header-beautyzone">
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
        <button onClick={deleteCookie} className="search-btnn" type="button">
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
          to={`/myorders/myorders/myorders/beautyzone`}
          className={displayProfile ? "profile-block" : "profile-display"}
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
          <Link to={`/cart/beautyzone`}>
            <button className="count-of-cart">{itemsInCart.length}</button>
            <button className="cart-icon-buttonn">
              <img src="./cart.png" alt="cart-icon" className="cart-icon" />
            </button>
          </Link>
        </div>
      </div>
      <div className="sukras-main-beauty">
        <div className="beautyzone-body">
          <Carousel />
        </div>
        <div className="beautyzone-body-2">
          {categories === "" ? (
            <div className="service-spinner">
              <TailSpin color={"#F4BD18"} height={70} width={70} />
            </div>
          ) : (
            <>
              <div className="beauty-cosmetic-head">
                <h1>Our Service videos</h1>
              </div>
              <div className="beauty-cosmetic-products">
                <div className="cosmatic-products-con">
                  {Ivideos.map((each) => (
                    <div className="cosmatic-videoItem">
                      <iframe
                        style={{ cursor: "pointer" }}
                        className="cosmatic-productImg"
                        width="560"
                        height="315"
                        src={each.videoUrl}
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
                <p className="our-services-head">Our Service's</p>
                {categories.map((each) => (
                  <Link to={`/${each.category}/${each._id}`}>
                    <button
                      key={each._id}
                      className="our-services-btn"
                      id={each._id}
                      type="button"
                    >
                      <img
                        className="our-services-img"
                        src={`${each.categoryImage}`}
                        alt={each.categoryImage}
                      />
                      <p
                        style={{ textTransform: "capitalize" }}
                        className="our-services-name"
                      >
                        {each.category}
                      </p>
                    </button>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="beauty-cosmetic-head">
          <h1>Cosmetics</h1>
          <p>
            <Link className="decoration" to={`/fashioncategory/cosmetics`}>
              View All
            </Link>
          </p>
        </div>
        <div className="beauty-cosmetic-products">
          <div className="cosmatic-products-con">
            {filterdProductsBasedOnType.map((each) => (
              <Link
                to={`/fashioncategory/detailedview/${each.type}/${each.name}/${each._id}`}
                className="cosmatic-productItem"
              >
                <img
                  className="cosmatic-productImg"
                  src={each.image}
                  alt={each.category}
                />
                <p className="cosmatic-product-name">{each.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default withRouter(Beautyzone);
