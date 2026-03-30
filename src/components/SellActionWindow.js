/** @format */

import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ holding }) => {
  console.log("SELL Window Opened With: ", holding);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(holding.buyPrice);

  const generalContext = useContext(GeneralContext);
  const handleSellClick = async () => {
    await axios.post(
      "https://zerodha-clone-backend-sztq.onrender.com/trade",
      {
        holdingId: holding._id,
        stockName: holding.stockName,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL",
      },
      { withCredentials: true },
    );

    generalContext.triggerHoldingsRefresh();
    generalContext.closeSellWindow();
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Funds will be credited</span>
        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
