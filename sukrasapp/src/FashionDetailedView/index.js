import Detailedview from "../Detailedview";
import "./index.css";

import { Link, Redirect } from "react-router-dom";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import { BsHandbag } from "react-icons/bs";

import { RiDeleteBinLine } from "react-icons/ri";

import { useState, useEffect } from "react";

import DetailedViewCarousel from "./Detailedviewcarousel";

const sizes = [
  { id: "S", text: "S" },
  { id: "M", text: "M" },
  { id: "L", text: "L" },
  { id: "XL", text: "XL" },
];

const colors = [
  { id: "#F93D3D", text: "#F93D3D" },
  { id: "#35CEE3", text: "#35CEE3" },
  { id: "#35E35B", text: "#35E35B" },
  { id: "#6235E3", text: "#6235E3" },
];

const ratingStars = [
  { id: 1, star1: "☆", star2: "★" },
  { id: 2, star1: "☆", star2: "★" },
  { id: 3, star1: "☆", star2: "★" },
  { id: 4, star1: "☆", star2: "★" },
  { id: 5, star1: "☆", star2: "★" },
];

const FashionDetailedView = (props) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [button, setButton] = useState("make-abook-details");
  const { match } = props;
  const { params } = match;

  const gobackTo = () => {
    const { history } = props;
    if (params.type === "cosmetics") {
      history.push("/beautyzone");
    } else {
      history.push(`/fashioncategory/${params.type}`);
    }
  };

  const changeReview = (event) => {
    setReview(event.target.value);
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
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
      `https://sukras.onrender.com/api/admin/getAllProduct`
    );
    const data = await response.json();
    if (response.ok === true) {
      setCategories(data.products);
      setLoad(true);
    }
  };

  const selectSize = (event) => {
    setSize(event.target.id);
  };

  const selectColor = (event) => {
    setColor(event.target.id);
  };

  const setupRating = (event) => {
    setRating(parseInt(event.target.id));
  };
  const filterItem = categories.filter((each) => each._id === params.id);

  const addReview = async () => {
    if (review === "") {
      alert("Please add Review about the product");
    } else if (rating === "") {
      alert("Please add rating about the product");
    } else {
      const url = "https://sukras.onrender.com/api/product/addProductReview";
      const details = {
        userId: Cookies.get("jwt_user"),
        productId: filterItem[0]._id,
        rating,
        review,
        date: formatDate(new Date()),
      };
      const options = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(details),
      };

      await fetch(url, options);
      setRating(0);
      document.getElementById("comment-input").value = "";
      getAllCategoryOfProducts();
    }
  };

  const deleteReview = async (event) => {
    const url = "https://sukras.onrender.com/api/product/deleteProductReview";

    const details = {
      productId: filterItem[0]._id,
      reviewId: event.target.id,
    };

    const opitons = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };

    await fetch(url, opitons);
    getAllCategoryOfProducts();
  };

  const addProductToCart = async () => {
    setButton("make-abook-details1");
    const url = "https://sukras.onrender.com/api/product/addProductToCart";
    const details = {
      userId: Cookies.get("jwt_user"),
      productId: params.id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      getAllCartItems();
      const { history } = props;
      history.replace(
        `/fashioncart/fashioncategory/${params.type}/${params.name}/${params.id}`
      );
    }
  };

  return load ? (
    <div classname="detailed-view-body">
      <div className="sukras-header-fashion">
        <img
          className="sukraslogobeauty"
          src="/sukraslogo.png"
          alt="Logo Space"
        />
        <button onClick={gobackTo} className="arrow-btn" type="button">
          <img className="left-arrow-mobile" src="/backarrow.png" />
        </button>
        <p class="detailed-view-head" style={{ textTransform: "capitalize" }}>
          {filterItem[0].name}
        </p>
        <div className="search-cart">
          <input
            className="serch-cart-input"
            placeholder="Enter keywords, title, author or ISBN "
            type="search"
          />
          <button className="search-icon-button">
            <img
              src="/search-icon.png"
              alt="search-icon"
              className="search-icon"
            />
          </button>

          <Link
            to={`/fashioncart/fashioncategory/${params.type}/${params.name}/${params.id}`}
          >
            <button className="fashion-count-of-cart">
              {cartItems.length}
            </button>
            <button className="cart-icon-buttonn">
              <img src="/cart.png" alt="cart-icon" className="cart-icon" />
            </button>
            <button className="fashion-cartBag-btn" type="button">
              <img className="fashion-cartBag" src="/cartBag.png" />
            </button>
          </Link>
        </div>
      </div>
      <div className="detailed-view-sub-body">
        <div className="details-view-con">
          <div className="details-view-body">
            <div className="fashion-details-content">
              <DetailedViewCarousel filterItem={filterItem[0]} />
              <h1
                style={{ textTransform: "capitalize" }}
                className="fashion-details-head"
              >
                {filterItem[0].name}
              </h1>

              <div className="selected-rating-con">
                <p className="fashion-selected-rating">
                  <span className="fashion-selected-price">₹ </span>
                  <span className="selected-price-icon">
                    {filterItem[0].price}
                  </span>
                </p>
                <p>
                  <span className="fashion-selected-price">₹ </span>
                  <span className="fashion-selected-price-icon">
                    {parseInt(filterItem[0].price) + 500}
                  </span>
                </p>
                <p className="fashion-selected-offer">(10% Off)</p>
              </div>
              <div className="selected-rating-con">
                <p className="selected-rating">{filterItem[0].rating}</p>
                <img
                  className="rating-star1"
                  src="/ratingstar.png"
                  alt="rating"
                />
                <p className="selected-rating">
                  ({filterItem[0].reviews} k reviews)
                </p>
              </div>
              {params.type === "cosmetics" ? null : (
                <p className="fashion-details-about">Select Size</p>
              )}
              {params.type === "cosmetics" ? null : (
                <div className="fashion-details-size-selection">
                  {sizes.map((each) => (
                    <button
                      id={each.id}
                      onClick={selectSize}
                      className={
                        each.id === size
                          ? "fashion-size-select1"
                          : "fashion-size-select"
                      }
                      type="button"
                    >
                      {each.text}
                    </button>
                  ))}
                </div>
              )}
              {params.type === "cosmetics" ? null : (
                <p className="fashion-details-about">Select Color</p>
              )}
              {params.type === "cosmetics" ? null : (
                <div className="fashion-details-size-selection">
                  {colors.map((each) => (
                    <button
                      id={each.id}
                      onClick={selectColor}
                      style={{ backgroundColor: each.text }}
                      className={
                        each.id === color
                          ? "fashion-color-select1"
                          : "fashion-color-select"
                      }
                      type="button"
                    ></button>
                  ))}
                </div>
              )}
              <p className="fashion-details-about">Product Details</p>
              <p>{filterItem[0].about}</p>
              <p className="fashion-details-about">Select Color</p>
              <p>• Soft material</p>
              <p>• Beautiful floral prints</p>
              <p>• Well stiched</p>
              <p className="fashion-details-about">Material & Care</p>
              <p>• Pure georgette</p>
              <p>• Mashine wash</p>
              <button
                onClick={addProductToCart}
                className={button}
                type="button"
              >
                Add to <BsHandbag />
              </button>

              <p className="fashion-details-about">Customer Reviews</p>

              {filterItem[0].productReviews.map((each) => (
                <div className="review-item">
                  <div className="review-rating">
                    <p>{each.rating}</p>
                    <img
                      className="rating-star2"
                      src="/ratingstar.png"
                      alt="rating"
                    />
                  </div>
                  <p className="review-para">{each.review}</p>
                  <div className="review-person">
                    <p>{each.userId}</p>
                    <div className="divider"></div>
                    <p>{each.date}</p>
                    <button
                      onClick={deleteReview}
                      id={each._id}
                      className={
                        Cookies.get("jwt_user") === each.userId
                          ? "delete-icon"
                          : "dont-delete"
                      }
                      type="button"
                    >
                      <RiDeleteBinLine id={each._id} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="AddComment">
                <h1 className="comment-head">Write your review</h1>
                <textarea
                  onChange={changeReview}
                  id="comment-input"
                  className="add-comment-input"
                  type="text"
                  placeholder="What did you like or dislike about our product."
                />
                <h1 className="rating-head">How would you rate our product?</h1>
                <div className="rating-box">
                  {ratingStars.map((each) => (
                    <button
                      onClick={setupRating}
                      id={each.id}
                      className={
                        each.id > rating ? "rating-button" : "rating-button2"
                      }
                      type="button"
                    >
                      {each.id > rating ? each.star1 : each.star2}
                    </button>
                  ))}
                </div>
                <button onClick={addReview} className="add">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="loader-spinner">
      {" "}
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default FashionDetailedView;