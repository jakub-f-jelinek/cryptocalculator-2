import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Popup = () => {
  const [popupOpen, setPopupOpen] = useState(true);
  const items = useSelector((store) => store.items);
  console.log(items);

  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  useEffect(() => {
    console.log("useEf POPUP");
    setTimeout(() => {
      console.log("useEf POPUP timeout");
      setPopupOpen(false);
    }, 2000);
  }, [items]);

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
