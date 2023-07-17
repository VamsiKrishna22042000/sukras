import Cookies from "js-cookie";
import "./index.css";

const CartItemsFashion = (props) => {
  const { cartItems, getAllCartItems } = props;

  const deleteProductFromCart = async (event) => {
    console.log(event.target.id);
    const url = "https://sukras.onrender.com/api/product/deleteProductFromCart";
    const details = {
      userId: Cookies.get("jwt_user"),
      cartId: event.target.id,
    };
    const opitons = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(details),
    };
    await fetch(url, opitons);
    getAllCartItems();
  };

  const countUpdate = async (event) => {
    const details = {
      userId: Cookies.get("jwt_user"),
      cartId: event.target.id,
      count: event.target.getAttribute("count"),
    };
    const url =
      "https://sukras.onrender.com/api/product/changeProductCountInCart";
    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      getAllCartItems();
    }
  };

  return (
    <div className="total-con-cartitems">
      {cartItems.map((each) => (
        <div className="cart-item">
          <img className="cart-img" src={each.image} alt="image-cart" />
          <div className="cart-contents">
            <p style={{ textTransform: "capitalize" }} className="cart-head">
              {each.name}
            </p>
            <p className="cart-head">
              <span className="service-price">₹</span> {each.price}
            </p>
            <div className="counter">
              <button
                id={each._id}
                count="decrement"
                onClick={countUpdate}
                className="counter-button"
              >
                -
              </button>
              <p className="counter-para">{each.count}</p>
              <button
                id={each._id}
                onClick={countUpdate}
                count="increment"
                className="counter-button"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={deleteProductFromCart}
            id={each._id}
            className="cart-cancel"
            type="button"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
export default CartItemsFashion;