import "./index.js";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);

  const [showAddCustomer, setAddCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState("");
  const [deleteCustomer, setDeleteCustomer] = useState("");

  useEffect(() => {
    getCustomerData();
  }, []);

  const ModalCustomer = () => {
    const [addCustomerLoad, setAddCustomerLoad] = useState(false);

    const [tobeAdded, setTobeAdded] = useState({
      email: "",
      mobileNumber: "",
      name: "",
    });

    const addingCustomer = async () => {
      setAddCustomerLoad(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/user/addUser`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tobeAdded),
      };

      const response = await fetch(url, options);
      if (response.ok) {
        setAddCustomer(false);
        getCustomerData();
      }
    };

    return (
      <>
        <div className="modal-boxcon"></div>
        {addCustomerLoad ? (
          <div style={{ height: 250, width: 410 }} className="modal-Customer">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        ) : (
          <form style={{ height: 250, width: 410 }} className="modal-Customer">
            <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
              Add New Customer
            </h1>
            <lable htmlFor="service-name-admin">Event Name</lable>
            <input
              className="service-admin-input"
              id="service-name-admin"
              type="text"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeAdded((prevAdd) => ({
                  ...prevAdd,
                  name: event.target.value,
                }));
              }}
            />
            <lable htmlFor="service-num-admin">Event Mobile Number</lable>
            <input
              className="service-admin-input"
              id="service-num-admin"
              maxLength={10}
              type="number"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeAdded((prevAdd) => ({
                  ...prevAdd,
                  mobileNumber: event.target.value,
                }));
              }}
            />
            <lable htmlFor="service-email-admin">Event Email</lable>
            <input
              className="service-admin-input"
              id="service-email-admin"
              type="text"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeAdded((prevAdd) => ({
                  ...prevAdd,
                  email: event.target.value,
                }));
              }}
            />
            <div className="service-button-admin-con-event">
              <button
                style={{ padding: 3, fontSize: 15 }}
                className="service-button-admin"
                type="button"
                onClick={addingCustomer}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setAddCustomer(false);
                }}
                style={{ padding: 3, fontSize: 15 }}
                className="service-button-admin"
                type="button"
              >
                close
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  const ModalEditCustomer = () => {
    const [modalLoad, setModalLoad] = useState(false);

    const filteredCustomer = customerData.filter(
      (each) => each._id === editCustomer
    );

    const [tobeEdited, setTobeEdited] = useState({
      userId: `${editCustomer}`,
      email: filteredCustomer[0].email,
      mobileNumber: filteredCustomer[0].mobileNumber,
      name: filteredCustomer[0].name,
    });

    const editUser = async () => {
      setModalLoad(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/editUser`;

      const reqConfigure = {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(tobeEdited),
      };

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        setModalLoad(false);
        setEditCustomer("");
        getCustomerData();
      }
    };

    return (
      <>
        <div className="modal-boxcon"></div>
        {modalLoad ? (
          <div style={{ height: 250, width: 410 }} className="modal-Customer">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        ) : (
          <form style={{ height: 250, width: 410 }} className="modal-Customer">
            <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
              Edit Existing Customer
            </h1>
            <lable htmlFor="service-name-admin">Event Name</lable>
            <input
              value={tobeEdited.name}
              className="service-admin-input"
              id="service-name-admin"
              type="text"
              style={{
                height: 25,
                marginBottom: 10,
                textTransform: "capitalize",
              }}
              onChange={(event) => {
                setTobeEdited((prevEdit) => ({
                  ...prevEdit,
                  name: event.target.value,
                }));
              }}
            />
            <lable htmlFor="service-num-admin">Event Mobile Number</lable>
            <input
              maxLength={10}
              value={tobeEdited.mobileNumber}
              className="service-admin-input"
              id="service-num-admin"
              type="number"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeEdited((prevEdit) => ({
                  ...prevEdit,
                  mobileNumber: event.target.value,
                }));
              }}
            />
            <lable htmlFor="service-email-admin">Event Email</lable>
            <input
              value={tobeEdited.email}
              className="service-admin-input"
              id="service-email-admin"
              type="text"
              style={{ height: 25, marginBottom: 10 }}
              onChange={(event) => {
                setTobeEdited((prevEdit) => ({
                  ...prevEdit,
                  email: event.target.value,
                }));
              }}
            />
            <div className="service-button-admin-con-event">
              <button
                style={{ padding: 3, fontSize: 15 }}
                className="service-button-admin"
                type="button"
                onClick={editUser}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setEditCustomer("");
                }}
                style={{ padding: 3, fontSize: 15 }}
                className="service-button-admin"
                type="button"
              >
                close
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  const ModalDeleteCustomer = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deletingCust = async () => {
      setLoadingDelete(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/deleteUser/${deleteCustomer}`;

      const requestConfigure = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(url, requestConfigure);
      if (response.ok) {
        setLoadingDelete(false);
        getCustomerData();
        setDeleteCustomer("");
      }
    };

    return (
      <>
        <div className="modal-boxcon"></div>
        {loadingDelete ? (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        ) : (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <p style={{ fontSize: 20 }}>
              Are you sure you want to delete customer ?
            </p>
            <div
              style={{
                width: 200,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              <button
                style={{
                  padding: 5,
                  backgroundColor: "#ffc720",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
                onClick={() => {
                  setDeleteCustomer("");
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deletingCust();
                }}
                style={{
                  padding: 5,
                  backgroundColor: "Red",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  const getCustomerData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllUsers`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      console.log(data.users);
      setCustomerData(data.users);
    }
  };

  return (
    <>
      {showAddCustomer && <ModalCustomer />}
      {customerData.length !== 0 ? (
        <div className="dashboard-component">
          <button
            onClick={() => {
              setAddCustomer(true);
            }}
            className="add-service"
            type="button"
          >
            + Add Customer
          </button>
          <div className="avialable-products-head">
            <div className="product-image">
              <p className="product-heads"></p>
            </div>
            <div className="product-name">
              <p className="product-heads">Name</p>
            </div>
            <div className="user-Number">
              <p className="product-heads">Mobile Number</p>
            </div>
            <div className="user-email">
              <p className="product-heads">Email</p>
            </div>
            <div className="user-Id">
              <p className="product-heads">User Id</p>
            </div>
            <div className="product-action">
              <p className="product-heads">Action</p>
              <img src="./updown.png" className="updown" alt="updown" />
            </div>
          </div>
          {customerData.map((each) => (
            <div className="avialable-products-head">
              <div className="product-image">
                <img
                  style={{ height: 20, width: 22 }}
                  className="productimage"
                  src="/user.png"
                  alt="serviceimage"
                />
              </div>
              <div className="product-name">
                <p
                  style={{ fontWeight: 400, color: "#000000" }}
                  className="product-heads"
                >
                  {each.name}
                </p>
              </div>
              <div className="user-Number">
                <p
                  style={{ fontWeight: 400, color: "#000000" }}
                  className="product-heads"
                >
                  {each.mobileNumber}
                </p>
              </div>
              <div className="user-email">
                <p
                  style={{ fontWeight: 400, color: "#000000" }}
                  className="product-heads"
                >
                  {each.email}
                </p>
              </div>
              <div className="user-Id">
                <p
                  style={{ fontWeight: 400, color: "#000000" }}
                  className="product-heads"
                >
                  {each._id}
                </p>
              </div>
              <div className="product-action">
                <div className="actions-con">
                  <button
                    onClick={() => {
                      setEditCustomer(each._id);
                    }}
                    className="actions-button"
                  >
                    <img
                      id={each._id}
                      className="actions-img"
                      src="./edit.png"
                      alt="edit"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteCustomer(each._id);
                    }}
                    type="button"
                    className="actions-button"
                  >
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
      ) : (
        <div className="loader-spinner-admin">
          <TailSpin color={"#F4BD18"} height={70} width={70} />
        </div>
      )}
      {editCustomer !== "" && <ModalEditCustomer />}
      {deleteCustomer !== "" && <ModalDeleteCustomer />}
    </>
  );
};

export default Customers;
