/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext();

export const GeneralContextProvider = (props) => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [refreshHoldings, setRefreshHoldings] = useState(false);

  // Central Holdings Fetch
  const loadHoldings = async () => {
    try {
      await axios.get(
        "https://zerodha-clone-backend-sztq.onrender.com/market/refresh-holdings",
        {
          withCredentials: true,
        },
      );

      const res = await axios.get(
        "https://zerodha-clone-backend-sztq.onrender.com/holdings",
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );

      setHoldings(res.data);
    } catch (err) {
      console.log("Holdings fetch failed", err);
    }
  };

  // Load + refresh trigger
  useEffect(() => {
    loadHoldings();
  }, [refreshHoldings]);

  const openBuyWindow = (uid) => {
    setBuyOpen(true);
    setSelectedHolding(uid);
  };

  const closeBuyWindow = () => {
    setBuyOpen(false);
    setSelectedHolding(null);
  };

  const openSellWindow = (holding) => {
    setSellOpen(true);
    setSelectedHolding(holding);
  };

  const closeSellWindow = () => {
    setSellOpen(false);
    setSelectedHolding(null);
  };

  const triggerHoldingsRefresh = () => {
    setRefreshHoldings((prev) => !prev);
  };

  return (
    <GeneralContext.Provider
      value={{
        holdings,
        openBuyWindow,
        closeBuyWindow,
        openSellWindow,
        closeSellWindow,
        refreshHoldings,
        triggerHoldingsRefresh,
      }}>
      {props.children}

      {buyOpen && <BuyActionWindow uid={selectedHolding} />}
      {sellOpen && selectedHolding && (
        <SellActionWindow holding={selectedHolding} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
