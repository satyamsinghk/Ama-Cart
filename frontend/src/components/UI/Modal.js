import React from "react";
import { createPortal } from "react-dom";
import { BackDrop } from "./Loader";

function Modal({ onclose, children }) {
  return (
    <>
      {createPortal(
        <>
          <BackDrop onclose={onclose} />
          <div className="modal">
            <button type="close" onClick={onclose}>
              X
            </button>
            <div className="content">{children}</div>
          </div>
        </>,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default Modal;
