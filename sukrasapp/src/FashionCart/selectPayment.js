import "./index.css";

import { withRouter } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

const paymentMethodArr = [
  {
    imgUrl: "CashafterPayment",
    mode: "Cash On Delivery",
  },
  {
    imgUrl: "UPi",
    mode: "Pay Using UPI",
  },
  {
    imgUrl: "Paytm",
    mode: "Pay Using Payment",
  },
  {
    imgUrl: "Creditdebitcards",
    mode: "Credit/Debit Cards",
  },
];

const SelectPayment = (props) => {
  const { updateProgress, progress, cartItems } = props;

  const [buttonSelected, setUpbutton] = useState("");
  const [address, setAddress] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [show, setShow] = useState(true);
  const [button, setbutton] = useState(false);

  const [doorNumber, setDoorNumber] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setpinCode] = useState("");
  const [state, setState] = useState("Andhra Pradesh");

  const setUpSuccessfull = () => {
    if (address === "") {
      if (doorNumber === "") {
        toast.error("Please enter door number", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (address2 === "") {
        toast.error("Please Enter address", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (pincode === "") {
        toast.error("Please Enter pincode", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        setbutton(true);

        if (buttonSelected !== "") {
          cartItems.map(async (each) => {
            const details = {
              userId: Cookies.get("jwt_user"),
              productId: each.productId,
              cartId: each._id,
              count: each.count,
              address: `${doorNumber}, ${address2}, ${pincode}, ${state}`,
              size: each.size,
            };
            const url = `${process.env.REACT_APP_ROOT_URL}/api/product/bookProduct`;
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(details),
            };
            const response = await fetch(url, options);
            if (response.ok) {
              updateProgress("PaymentDone");
            }
          });
        } else {
          toast.info("Please select Cash On Delivery", {
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            theme: "colored",
          });
        }
      }
    } else {
      setbutton(true);

      if (buttonSelected !== "") {
        cartItems.map(async (each) => {
          const details = {
            userId: Cookies.get("jwt_user"),
            productId: each.productId,
            cartId: each._id,
            count: each.count,
            address: address,
            size: each.size,
          };
          const url = `${process.env.REACT_APP_ROOT_URL}/api/product/bookProduct`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
          };
          const response = await fetch(url, options);
          if (response.ok) {
            updateProgress("PaymentDone");
          }
        });
      } else {
        toast.info("Please select Cash On Delivery", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      }
    }
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllUsers`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      console.log(data.users);
      setCustomerData(data.users);

      const filteredU = data.users.filter(
        (each) => each._id === Cookies.get("jwt_user")
      );

      if (filteredU[0] && filteredU[0].address !== undefined) {
        setAddress(filteredU[0].address);
      }
    }
  };

  const selectButton = () => {
    setUpbutton("Cash On Delivery");
  };

  const filteredUser = customerData.filter(
    (each) => each._id === Cookies.get("jwt_user")
  );

  const settingShow = () => {
    if (filteredUser[0] && filteredUser[0].address !== undefined) {
      setAddress(filteredUser[0].address);
    }
    setShow(!show);
  };

  return (
    <div className="payment-mode-fashion">
      <ToastContainer />
      <h1 className="fashion-paymentmode-head">Payment Mode</h1>
      {filteredUser[0] && filteredUser[0].address === undefined && (
        <div className="fashion-address">
          <div className="con-address">
            <h4 style={{ fontSize: 15 }}>Door Number</h4>
            <textarea
              value={doorNumber}
              placeholder="Enter Door Number"
              autoFocus
              onChange={(e) => {
                setDoorNumber(e.target.value);
              }}
              type="text"
              className="input-address"
            />
          </div>
          <div className="con-address">
            <h4 style={{ fontSize: 15 }}>Enter Address</h4>
            <textarea
              value={address2}
              placeholder="Enter Address"
              autoFocus
              onChange={(e) => {
                setAddress2(e.target.value);
              }}
              type="text"
              className="input-address"
            />
          </div>
          <div className="con-address">
            <h4 style={{ fontSize: 15 }}>Enter Pincode</h4>
            <textarea
              value={pincode}
              placeholder="Enter Pincode"
              autoFocus
              onChange={(e) => {
                setpinCode(e.target.value);
              }}
              type="text"
              className="input-address2"
            />
          </div>
          <div className="con-address">
            <h4 style={{ fontSize: 15 }}>Select State</h4>
            <select
              value={state}
              autoFocus
              onChange={(e) => {
                setState(e.target.value);
              }}
              type="text"
              className="input-address2 "
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
        </div>
      )}
      {filteredUser[0] &&
        filteredUser[0].address !== undefined &&
        show === true && (
          <button
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#f4bd18",
              color: "white",
              borderWidth: 0,
              padding: 5,
            }}
            type="button"
            className="button"
            onClick={settingShow}
          >
            Change Address
          </button>
        )}
      {show === false && (
        <div className="fashion-address">
          <div className="con-address" style={{ alignSelf: "flex-start" }}>
            <h4 style={{ fontSize: 15 }}>Enter Address</h4>
            <textarea
              value={address}
              placeholder="Enter Address"
              autoFocus
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              className="input-address3"
            />
          </div>
        </div>
      )}
      {filteredUser[0] &&
        filteredUser[0].address !== undefined &&
        show === false && (
          <button
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#f4bd18",
              color: "white",
              borderWidth: 0,
              padding: 5,
            }}
            type="button"
            className="button"
            onClick={settingShow}
          >
            Close
          </button>
        )}
      <div className="fashion-buttons">
        {paymentMethodArr.map((each) => (
          <button
            onClick={selectButton}
            className={
              each.mode !== "Cash On Delivery"
                ? "fashion-payment-modebutton2"
                : buttonSelected === ""
                ? "fashion-payment-modebutton1"
                : "fashion-payment-modebutton3"
            }
            type="button"
          >
            <img
              className="paymentmode-image"
              src={`/${each.imgUrl}.png`}
              alt={each.mode}
            />
            <p>{each.mode}</p>
            <img
              className={
                each.mode !== "Cash On Delivery"
                  ? "yes-disable"
                  : buttonSelected === ""
                  ? "yes-disable"
                  : "yes-enable"
              }
              src={`/yes.png`}
              alt={each.yes}
            />
          </button>
        ))}
      </div>
      {button ? (
        <div className="fashion-proceed-to-schedule">
          <TailSpin
            wrapperStyle={{ alignSelf: "center", justifyContent: "center" }}
            color={"white"}
            height={23}
            width={23}
          />
        </div>
      ) : (
        <button
          onClick={setUpSuccessfull}
          className={
            progress === "Cart"
              ? "fashion-proceed-button-disable"
              : "fashion-proceed-to-schedule"
          }
          type="button"
        >
          Proceed
        </button>
      )}
    </div>
  );
};

export default withRouter(SelectPayment);
