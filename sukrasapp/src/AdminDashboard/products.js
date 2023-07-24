import "./index.css";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

const Products = () => {
  const [productsAvailable, setAvailableProducts] = useState([]);
  const [buttonState, setButton] = useState(false);
  const [load, setLoad] = useState(false);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const settingButton = () => {
    setButton(!buttonState);
  };

  const getAllProducts = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllProduct`
    );
    const da = await res.json();
    if (res.ok) {
      setAvailableProducts(da.products);
      setLoad(true);
      console.log(da.products);
    }
  };

  const settingModal = () => {
    setModal(!showModal);
  };

  const Modal = () => {
    return (
      <>
        <div className="modal-boxcon"></div>
        <div className="modal-box">
          <h1>Modalbox</h1>
          <button onClick={settingModal} type="button">
            close
          </button>
        </div>
      </>
    );
  };

  return load ? (
    <>
      {showModal && Modal}
      <div className="dashboard-component2">
        <button onClick={settingModal} className="add-service" type="button">
          + Add new product
        </button>
        <div className="avialable-products-head">
          <div className="product-checkbox"></div>
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Toggle</p>
          </div>
          <div className="product-name">
            <p className="product-heads">Name</p>
          </div>
          <div className="product-category">
            <p className="product-heads">Category</p>
          </div>
          <div className="product-id">
            <p className="product-heads">Id</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
          <div className="product-action">
            <p className="product-heads">Action</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
        </div>
        {productsAvailable.map((each) => (
          <div id={each._id} className="avialable-products">
            <div className="product-checkbox">
              <input type="checkbox" />
            </div>
            <div className="product-image">
              <img
                className="productimage"
                src={each.image}
                alt="productimage"
              />
            </div>
            <div id={each._id} className="product-toggle">
              <div className={buttonState ? "toggle-con2" : "toggle-con1"}>
                <button
                  onClick={settingButton}
                  type="button"
                  className={buttonState ? "togglebutton2" : "togglebutton1"}
                ></button>
              </div>
            </div>
            <div className="product-name">
              <p style={{ textTransform: "capitalize" }}>{each.name}</p>
            </div>
            <div className="product-category">
              <p style={{ textTransform: "capitalize" }}>{each.category}</p>
            </div>
            <div className="product-id">
              <p>{each._id}</p>
            </div>
            <div className="product-action">
              <div className="actions-con">
                <button className="actions-button">
                  <img className="actions-img" src="./edit.png" alt="edit" />
                </button>
                <button className="actions-button">
                  <img
                    className="actions-img"
                    src="./delete-fill.png"
                    alt="delete"
                  />
                </button>
              </div>
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
export default Products;
