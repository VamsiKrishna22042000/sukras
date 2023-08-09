import { useState } from "react";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";

import { TailSpin } from "react-loader-spinner";

/*PaymentSection is here*/

const paymentMethodArr = [
  {
    imgUrl: "CashafterPayment",
    mode: "Cash After Service",
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

const ScheduleTime = (props) => {
  const { progress, ScheduleTimeProgress, TotalPrice, discount } = props;

  const [buttonSelected, setUpbutton] = useState("");

  const sendUpdate = (props) => {
    if (buttonSelected !== "") {
      ScheduleTimeProgress(["Done"]);
    } else {
      toast.info(`Select Cash After Service`, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  const selectButton = () => {
    setUpbutton("Cash After Service");
  };

  return (
    <div className="price-details">
      <ToastContainer />
      <p className="price-head1">PriceDetials</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p className="actual-price">Actual Price</p>
        <p className="price1">
          <span className="actual-price">₹</span>
          {TotalPrice}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p className="total-discount">Total Discount</p>
        <p className="total-discount">
          <span className="actual-price">-₹</span>
          {discount}
        </p>
      </div>
      <div
        className="total-cart-price"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p className="total-price-head">Total</p>
        <p className="total-price-head">
          <span className="actual-price">₹</span> {TotalPrice - discount}
        </p>
      </div>
      <div className="payment-mode">
        <h1 className="paymentmode-head">Payment Mode</h1>
        {paymentMethodArr.map((each) => (
          <button
            onClick={selectButton}
            className={
              each.mode !== "Cash After Service"
                ? "payment-modebutton2"
                : buttonSelected === ""
                ? "payment-modebutton1"
                : "payment-modebutton3"
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
                each.mode !== "Cash After Service"
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

      <button
        onClick={sendUpdate}
        className="proceed-to-schedule"
        type="button"
      >
        Proceed
      </button>
    </div>
  );
};
export default withRouter(ScheduleTime);
