import React from "react";
import { createPortal } from "react-dom";

export const BackDrop = (props) => {
  const handleClick = () => {
    if (props.onclose) {
      props.onclose();
    }
  };

  return <div onClick={handleClick} className="loader-overlay"></div>;
};

function Loader() {
  return createPortal(
    <>
      <BackDrop />
      <div className="loading-dots">
        <div>Loading</div>
        <div className="loading-dots--dot"></div>
        <div className="loading-dots--dot"></div>
        <div className="loading-dots--dot"></div>
      </div>
    </>,
    document.getElementById("loader-root")
  );
}

export default Loader;
