import "../../routes/myOrders/MyOrders.css";
import boxIcon from "../../assets/frontend_assets/parcel_icon.png";
import { useEffect, useState } from "react";

import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function MyOrders() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady) return;

    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        setOrders(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [authReady, user]);


  if (!authReady) {
    return (
      <div className="orders-page">
        <h2>My Orders</h2>
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="orders-page">
        <h2>My Orders</h2>
        <p>Please login to see your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <h2>My Orders</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No previous orders.</p>}

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-icon">
            <img src={boxIcon} alt="order icon" />
          </div>

          <div className="order-info">
            <p className="order-title">
              {order.items
                .map((item) => `${item.name} x ${item.quantity}`)
                .join(", ")}
            </p>
          </div>

          <p className="order-price">${order.totalPrice}</p>
          <p className="order-items">{order.totalItems}</p>

          <p className="order-status">
            <span className="dot"></span>
            Food Processing
          </p>

          <button className="track-btn">Track Order</button>
        </div>
      ))}
    </div>
  );
}
