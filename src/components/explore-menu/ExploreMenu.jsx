import { useState,useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { menu_list } from "../../assets/frontend_assets/assets";
import "../../components/explore-menu/ExploreMenu.css";

export default function ExploreMenu() {
  const { setSelectCat} = useContext(CartContext);
  const [clicked,setClicked] = useState(null);

  function handleFilter(item){
    const value = clicked === item ? null : item;
    setClicked(value);
    setSelectCat(value);
  }

  return (
    <div className="explore-menu" id="menu">
      <div>
        <h1>Explore our menu</h1>
        <h3>
          Choose from a diverse menu featuring a detectable array of dishes.
          Experience delicious meals made to satisfy your cravings.
        </h3>

        <ul>
          {menu_list.map((item, index) => (
            <li key={index}>
              <button onClick={() => handleFilter(item.menu_name)}>
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={clicked === item.menu_name ? 'active' : ''}
                />
                <p>{item.menu_name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
