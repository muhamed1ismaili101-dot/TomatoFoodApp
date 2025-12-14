import "../../routes/components/Display.css";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { useToast } from "../../context/toastContext";

export default function Display() {
  const { cart, removeItem } = useContext(CartContext);

  const { showToast } = useToast();

  return (
    <>
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      {cart.map((item) => (
        <div className="cart-items-items" key={item._id}>
          <p>
            <img src={item.image} alt="item_img" />
          </p>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
          <p>{item.price * item.quantity}</p>
          <p>
            <button
              onClick={() => {
                removeItem(item._id);
                showToast("error", "Item removed from cart!");
              }}
            >
              X
            </button>
          </p>
        </div>
      ))}
    </>
  );
}
