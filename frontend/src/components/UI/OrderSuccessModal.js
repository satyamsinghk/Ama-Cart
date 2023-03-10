import React from "react";
import Modal from "./Modal";
import OrderSuccessImage from "../../assets/icons/order_success.svg";

function OrderSuccessModal({ onclose,orderId }) {
  return (
    <Modal onclose={onclose}>
      <div className="order-container">
        <div className="order-container--success">
          <img src={OrderSuccessImage} alt="Success" className="img-fluid" />
          <div className="message">
            <h1>Order Successfully Placed!</h1>
            <span>OrderID #{orderId}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderSuccessModal;
