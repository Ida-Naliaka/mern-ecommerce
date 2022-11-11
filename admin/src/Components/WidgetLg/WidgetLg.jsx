import { useEffect, useState } from "react";
import "./WidgetLg.css";
//import {format} from "timeago.js"
import * as React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(`/api/orders`, config);
        setOrders(res.data);
      } catch {}
    };
    getOrders();
    // eslint-disable-next-line
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </tbody>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">
              {" "}
              {order.createdAt}
              {/*format(order.createdAt)*/}
            </td>
            <td className="widgetLgAmount">${order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
