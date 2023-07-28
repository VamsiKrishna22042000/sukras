import "./index.css";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

import Mode from "./modalboxofproduct.js";

const Products = () => {
  const [productsAvailable, setAvailableProducts] = useState([]);
  const [buttonState, setButton] = useState(false);
  const [load, setLoad] = useState(false);
  const [showMode, setMode] = useState(false);
  const [availableTypes, setType] = useState([]);
  const [selectedType, setSele] = useState([]);
  const [availableCategories, setCategories] = useState([]);

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
      /*console.log(da.products)*/
    }
  };

  const getAllCategoryOfProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
    );
    const data = await response.json();
    if (response.ok === true) {
      /*console.log(data);*/
      const type = data.categories.map((each) => each.type);
      setType(type);
      const obtainedCategories = data.categories.map((each) => each.category);
      setCategories(obtainedCategories[0]);
    }
  };

  const getSubCategories = async (value) => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCategory`
    );
    const data = await response.json();
    if (response.ok === true) {
      const obtainedCategories = data.categories.filter(
        (each) => each.type === value
      );
      setCategories(obtainedCategories[0].category);
      /*console.log(obtainedCategories[0].category)*/
    }
  };

  const settinMode = () => {
    setMode(!showMode);
    getAllCategoryOfProducts();
  };

  const settingType = (event) => {
    /*console.log(event.target.value)*/
    setSele(event.target.value);
    getSubCategories(event.target.value);
  };

  return load ? (
    <>
      {showMode && (
        <Mode
          selectedType={selectedType}
          availableTypes={availableTypes}
          availableCategories={availableCategories}
          settinMode={settinMode}
          settingType={settingType}
        />
      )}
      <div className="dashboard-component2">
        <button onClick={settinMode} className="add-service" type="button">
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
          <div className="product-toggle">
            <p className="product-heads">Price</p>
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
          <div key={each._id} id={each._id} className="avialable-products">
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
            <div id={each._id} className="product-toggle">
              <p style={{ textTransform: "capitalize" }}>₹ {each.price}</p>
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
