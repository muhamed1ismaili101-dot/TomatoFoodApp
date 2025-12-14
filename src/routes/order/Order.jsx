import { useRef, useContext } from "react";
import "../../routes/components/CartTotal.css";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toastContext";

import { auth } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function Order() {
  const { cart, totalPrice, cartQuantity, resetCart } = useContext(CartContext);

  const { showToast} = useToast();

  const navigate = useNavigate();
  const fee = Number((Math.random() * 10).toFixed(2));
  const itemsInCart = cartQuantity();
  const total = totalPrice();
  const finalTotal = itemsInCart > 0 ? total + fee : 0;

  const first = useRef();
  const last = useRef();
  const street = useRef();
  const city = useRef();
  const state = useRef();
  const zip = useRef();
  const country = useRef();
  const phone = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      showToast('warning', "Please login to place orders");
      return;
    }

    if (!itemsInCart) {
      showToast('error', "Your cart is empty");
      return;
    }

    const newOrder = {
      userId: user.uid, 
      userEmail: user.email,
      billing: {
        firstName: first.current.value,
        lastName: last.current.value,
        street: street.current.value,
        city: city.current.value,
        state: state.current.value,
        zip: zip.current.value,
        country: country.current.value,
        phone: phone.current.value,
      },
      items: cart,
      totalItems: cart.reduce((t, i) => t + i.quantity, 0),
      totalPrice: cart.reduce((t, i) => t + i.quantity * i.price, 0),
      deliveryFee: fee,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), newOrder);
      resetCart();
      navigate("/");
      showToast('success', 'Your order is processing.');
    } catch (err) {
      showToast('error',"Failed to place order");
    }
  }

  return (
    <div className="order-main">
      <div className="order-grid">
        <form className="checkout-form" onSubmit={handleSubmit} id="orderForm">
          <h2>Billing Details</h2>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                ref={first}
                required
              />
            </div>

            <div className="form-group">
              <input type="text" placeholder="Last Name" ref={last} required />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Street Address"
              ref={street}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder="City" ref={city} required />
            </div>

            <div className="form-group">
              <input type="text" placeholder="State" ref={state} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder="Zip Code" ref={zip} required />
            </div>

            <div className="form-group">
              <input type="text" placeholder="Country" ref={country} required />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Phone Number"
              ref={phone}
              required
            />
          </div>
        </form>

        <div className="cart-totals">
          <h2>Cart Totals</h2>

          <div className="totals-row">
            <p>Subtotals</p>
            <p>${itemsInCart > 0 ? total.toFixed(2) : "0.00"}</p>
          </div>

          <div className="totals-row">
            <p>Delivery Fee</p>
            <p>${itemsInCart > 0 ? fee.toFixed(2) : "0.00"}</p>
          </div>

          <div className="totals-row total">
            <p>Total</p>
            <p>${finalTotal.toFixed(2)}</p>
          </div>

          <button className="checkout-btn" type="submit" form="orderForm">
            PROCEED PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
}
