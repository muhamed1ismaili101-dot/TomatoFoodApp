import { useState } from "react";
import { auth } from "../../firebase";
import background from "../../assets/frontend_assets/header_img.png";
import "../../components/hero-section/Hero.css";
import Modal from "../Modal";
import { useToast } from "../../context/toastContext";
import AddFood from "../AddFood/AddFood";

const ADMIN_EMAIL = "muhamed1ismaili101@gmail.com";

export default function Hero({ handleAddFood }) {
  const [isOpen, setIsOpen] = useState(false);

  const { showToast} = useToast();

  function handleClick() {
    const user = auth.currentUser;

    if (!user) {
      showToast('warning', "Please login first.");
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      showToast('warning', "You are not authorized to add food.");
      return;
    }

    setIsOpen(true);
  }

  return (
    <div className="hero-image"
      style={{ backgroundImage: `url(${background})` }}>

      <div className="hero-content">
        <h1>
          Order your <br />favourite food here
        </h1>

        <h3>
          Choose from a diverse menu featuring a detectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </h3>

        <button onClick={handleClick}>Add Food</button>

        {isOpen && (
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <AddFood handleAddFood={handleAddFood} onClose={() => setIsOpen(false)}/>
          </Modal>
        )}
      </div>
    </div>
  );
}
