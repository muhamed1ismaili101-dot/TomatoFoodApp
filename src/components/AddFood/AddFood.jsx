import { useNavigate} from "react-router-dom";
import "./AddFood.css";
import { useToast } from "../../context/toastContext";
import { useRef } from "react";

export default function AddFood({handleAddFood, onClose}) {
  const formRef = useRef();
  const navigate = useNavigate();

  const { showToast} = useToast();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const imageFile = formData.get("image");

    if (
      !data.name ||
      !data.price ||
      !data.description ||
      !data.category ||
      !imageFile ||
      imageFile.size === 0
    ) {
      showToast('warning', "All fields are required");
      return;
    }

    const newFood = {
      _id: Date.now(),
      name: data.name,
      image: URL.createObjectURL(imageFile),
      price: Number(data.price),
      description: data.description,
      category: data.category,
    };

    handleAddFood(newFood);

    showToast('success', 'Food added to menu.');
    formRef.current.reset();
    navigate('/');
    onClose();
  }

  return (
    <form className="food-form" ref={formRef} onSubmit={handleSubmit}>
      <h2>Add New Food</h2>

      <input type="text" placeholder="Food name" name="name" />

      <input type="number" placeholder="Price" name="price" />

      <textarea placeholder="Description" name="description"></textarea>

      <select name="category">
        <option value="">Select category</option>
        <option>Salad</option>
        <option>Rolls</option>
        <option>Dessert</option>
        <option>Sandwich</option>
        <option>Cake</option>
        <option>Pure Veg</option>
        <option>Pasta</option>
        <option>Noodles</option>
      </select>

      <div className="image-upload">
        <label className="upload-box">
          <input type="file" hidden name="image" />
          <span>Click to upload image</span>
        </label>
      </div>

      <button className="submit-btn" type="submit">
        Add Food
      </button>
    </form>
  );
}
