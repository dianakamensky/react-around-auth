import React from "react";

function InfoTooltip({ isOpen, success, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__message">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon-image"
          src={success ? "../images/v.svg" : "../images/x.svg"}
        ></img>
        <p>
          {success
            ? "Success! You have now been registered."
            : "Oops, something went wrong! Please try again."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
