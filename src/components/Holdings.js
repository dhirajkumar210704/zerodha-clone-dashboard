import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import {VerticalGraph} from "./VerticalGraph";

const Holdings = () => {
  const { holdings, openSellWindow } = useContext(GeneralContext);
  console.log("Holdings from context: ", holdings);

  const labels = holdings.map((stock) => stock.stockName);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map((stock) => stock.buyPrice),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ]  
  }

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Buy Price</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((stock) => {
              const invested = stock.buyPrice * stock.qty;
              const current = stock.currentPrice * stock.qty;
              const pnl = current - invested;
              const netChg = invested ? (pnl / invested) * 100: 0;

              const profClass = pnl >= 0 ? "profit" : "loss";

              return (
                <tr key={stock._id}>
                  <td>{stock.stockName}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.buyPrice?.toFixed(2)}</td>
                  <td>{stock.currentPrice?.toFixed(2)}</td>
                  <td>{current.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{netChg.toFixed(2)}%</td>
                  <td>
                    <button
                      className="sell-btn"
                      onClick={() => openSellWindow(stock)}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;