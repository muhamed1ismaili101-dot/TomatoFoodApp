import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [selectCat, setSelectCat] = useState(null);
  const [cart, setCart] = useState([]);

  function incrementItem(foodItem) {
    const exists = cart.find((item) => item._id === foodItem._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...foodItem, quantity: 1 }]);
    }
  }

  function decrementItem(id) {
    const exists = cart.find((item) => item._id === id);
    if (!exists) return;

    if (exists.quantity === 1) {
      setCart(cart.filter((item) => item._id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }

  function removeItem(id) {
    const exists = cart.find((item) => item._id === id);
    if (exists) {
      setCart(cart.filter((item) => item._id !== id));
    }
  }

  function resetCart(){
    setCart([]);
  }

  function track(){
    return [...cart];
  }

  function cartQuantity() {
    return cart.length;
  }

  function ItemsInCart() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function totalPrice() {
    return cart.reduce((value, price) => {
      return value + price.price * price.quantity;
    }, 0);
  }

  function formatCartItems() {
    return cart.map((item) => `${item.name} x ${item.quantity}`).join(",");
  }

  return (
    <CartContext.Provider
      value={{
        selectCat,
        setSelectCat,
        cart,
        setCart,
        incrementItem,
        decrementItem,
        cartQuantity,
        removeItem,
        totalPrice,
        ItemsInCart,
        formatCartItems,
        resetCart,
        track
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
