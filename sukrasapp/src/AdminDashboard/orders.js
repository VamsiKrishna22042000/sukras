import "./index.css";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

const Orders = () => {
  const [myorders, setOrders] = useState([]);

  const [load, setLoad] = useState(false);
  const [buttonToggle, setToggle] = useState("");

  const toggleProduct = () => {};

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/appoinments`
    );
    const data = await response.json();

    if (response.ok) {
      const filterdProducts = data.salons.filter(
        (each) => each["productId"] !== undefined
      );
      setOrders(filterdProducts);
      setLoad(true);
    }
  };

  console.log(myorders);

  return load ? (
    <>
      <div className="dashboard-component2">
        <div className="avialable-products-head">
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Toggle</p>
          </div>

          <div className="product-name">
            <p className="product-heads">Name</p>
          </div>

          <div className="product-name">
            <p className="product-heads">User Name</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Price</p>
          </div>

          <div className="product-id">
            <p className="product-heads">Address</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Count</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Booking Date</p>
          </div>
        </div>
        {myorders.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-image">
              <img
                className="productimage"
                src={each.photos[0]}
                alt="productimage"
              />
            </div>
            <div id={each._id} className="product-toggle">
              {buttonToggle === each._id ? (
                <TailSpin color={"#F4BD18"} height={50} width={50} />
              ) : (
                <div className={each.active ? "toggle-con3" : "toggle-con4"}>
                  <button
                    onClick={toggleProduct}
                    id={each._id}
                    type="button"
                    className={each.active ? "togglebutton2" : "togglebutton1"}
                  ></button>
                </div>
              )}
            </div>
            <div className="product-name">
              <p style={{ textTransform: "capitalize" }}>{each.name}</p>
            </div>
            <div className="product-name">{each.userName}</div>
            <div id={each._id} className="product-toggle">
              <p style={{ textTransform: "capitalize" }}>
                ₹ {each.price * each.count}
              </p>
            </div>

            <div className="product-id">
              <p>{each.address}</p>
            </div>
            <div className="product-action">
              <p>{each.count}</p>
            </div>
            <div className="product-action">
              <p>{each.orderedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default Orders;
