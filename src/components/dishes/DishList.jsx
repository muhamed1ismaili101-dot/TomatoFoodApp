import "../../components/dishes/DishList.css";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function DishList({ menuItem }) {
  const { incrementItem,decrementItem, cart } = useContext(CartContext);
  const itemInCart = cart.find((item) => item._id === menuItem._id);
  return (
    <li className="dish-card" key={menuItem._id}>
      <div className="dish-img-wrapper">
        <img src={menuItem.image} alt={menuItem.name} className="dish-img" />

        {!itemInCart && (
          <button className="add-btn" onClick={() => incrementItem(menuItem)}>
            +
          </button>
        )}
        {itemInCart && (
          <div className="qty-box">
            <button className="qty-btn minus" onClick={() => decrementItem(menuItem._id)}>-</button>
            <span className="qty-number">{itemInCart.quantity}</span>
            <button className="qty-btn plus" onClick={() => incrementItem(menuItem)}>+</button>
          </div>
        )}
      </div>

      <div className="dish-info">
        <div className="dish-header">
          <h2 className="dish-name">{menuItem.name}</h2>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="star-icon"
              >
                <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
              </svg>
            ))}
          </div>
        </div>

        <p className="dish-description">{menuItem.description}</p>

        <span className="dish-price">${menuItem.price}</span>
      </div>
    </li>
  );
}
