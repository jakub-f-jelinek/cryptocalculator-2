import React from "react";
import { useState } from "react";

export const Popup = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <>
      <button onClick={togglePopup}>Open popup</button>

      {popupOpen && (
        <div className="popup__container">
          <div>Popup</div>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </>
  );
};
