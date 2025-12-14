import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header'
import Hero from './components/hero-section/Hero'
import ExploreMenu from './components/explore-menu/ExploreMenu'
import Cart from "./routes/cart/Cart";
import Footer from "./components/footer/Footer";
import MobileSection from "./components/mobile-app/MobileSection";
import Dishes from "./components/dishes/Dishes";
import Order from "./routes/order/Order";
import MyOrders from "./routes/myOrders/MyOrders";
import NotFound from "./routes/NotFound";
import { useState } from "react";
import { food_list } from './assets/frontend_assets/assets'

function App() {
  const [onAddFood, setOnAddFood] = useState(food_list);

  function handleAddFood(food){
    setOnAddFood(prev => [...prev, food]);
  }

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero  handleAddFood={handleAddFood}/>
              <ExploreMenu />
              <Dishes onAddFood={onAddFood}/>
              <MobileSection/>
            </>
          }
        />
        <Route path="/myorders" element={<MyOrders/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>

    </>
  );
}

export default App;
