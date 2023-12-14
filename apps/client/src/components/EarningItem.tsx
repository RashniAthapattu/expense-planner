"use client";
import React, { useState } from "react";
import { Earning } from "../interfaces/earnings";
import Popup from "./updatePopup";

export default async function EarningItem(props: Earning) {
  interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.description}
      <div>
        <label className="mr-3">{props.amount} LKR</label>
        <button className="btn btn-sm btn-outline-success m-2">Edit</button>
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
          <form>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter description"
                value={props.description}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter amount"
                value={props.amount}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Popup>
        <button className="btn btn-sm btn-outline-danger">Delete</button>
      </div>
    </li>
  );
}
