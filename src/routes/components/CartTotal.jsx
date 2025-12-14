import "../../routes/components/CartTotal.css";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

export default function CartTotal() {
    const { totalPrice,cartQuantity } = useContext(CartContext);

    const fee = Math.random() * 10;
    const total = +totalPrice();
    const itemsInCart = cartQuantity() > 0;
  return (
    <div className="cart-bottom">
      <div className="cart-totals">
        <h2>Cart Totals</h2>

        <div className="totals-row">
          <p>Subtotals</p>
          <p>${itemsInCart ? total : 0}</p>
        </div>

        <div className="totals-row">
          <p>Delivery Fee</p>
          <p>${itemsInCart ? fee.toFixed(2) : 0}</p>
        </div>

        <div className="totals-row total">
          <p>Total</p>
          <p>${itemsInCart ? +fee.toFixed(2) + total : 0}</p>
        </div>

        <Link to='/cart/order'><button className="checkout-btn">PROCEED TO CHECKOUT</button></Link>
      </div>

      <div className="promo-box">
        <p>If you have a promocode, Enter it here</p>

        <div className="promo-input">
          <input type="text" placeholder="promo code" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
