/** @format */

import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://zerodha-clone-backend-sztq.onrender.com/orders", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setOrders([]);
      });
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6)}</td>
                <td className="instrument">{order.stockName}</td>
                <td>{order.qty}</td>
                <td>₹{order.buyPrice}</td>
                <td>{order.mode}</td>
                <td className="status completed">COMPLETED</td>
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
