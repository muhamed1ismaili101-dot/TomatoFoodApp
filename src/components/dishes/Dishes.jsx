import DishList from "./DishList";
import { useContext } from "react";
import { CartContext} from '../../context/cartContext'

export default function Dishes({onAddFood}) {
  const { selectCat } = useContext(CartContext);
    const filteredFoods = selectCat ? onAddFood.filter((food) => food.category === selectCat) : onAddFood;

  return (
    <section className="dishes-section">
      <h1 className="dishes-title">Top dishes near you</h1>

      <ul className="dishes-grid">
        {filteredFoods.map((menuItem) => (
          <DishList key={selectCat +'_'+menuItem._id} menuItem={menuItem} />
        ))}
      </ul>
    </section>
  );
}
