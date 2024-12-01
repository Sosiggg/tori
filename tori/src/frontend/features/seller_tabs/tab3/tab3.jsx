import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // Import AiOutlineMinus icon
import { Navigate } from "react-router-dom"; // Import Navigate component
import "./tab3.css";

const Tab3 = ({ isEditing, handleEditMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Apple",
      quantity: 10,
      price: 2.0,
      stock: 30,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Banana",
      quantity: 20,
      price: 1.5,
      stock: 50,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Orange",
      quantity: 15,
      price: 2.5,
      stock: 40,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [navigateToReview, setNavigateToReview] = useState(false); // State for navigation

  const decreaseQuantity = (id, e) => {
    e.stopPropagation(); // Prevent modal from opening when minus is clicked
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const increaseQuantity = (id, e) => {
    e.stopPropagation(); // Prevent modal from opening when plus is clicked
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleAddProduct = (newItem) => {
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  const handleEditProduct = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setIsModalOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const EditProductModal = ({ isOpen, onClose, item, onSave }) => {
    const [name, setName] = useState(item ? item.name : "");
    const [quantity, setQuantity] = useState(item ? item.quantity : "");
    const [price, setPrice] = useState(item ? item.price : "");

    const handleSave = () => {
      if (name && quantity && price) {
        onSave({ ...item, name, quantity, price });
      }
    };

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{item ? "Edit Product" : "Add Product"}</h2>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </label>
          <button onClick={handleSave}>{item ? "Save" : "Add"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  // Check if we should navigate to the Review page
  if (navigateToReview) {
    return <Navigate to="/seller/review" />; // Navigate to the Review page
  }

  return (
    <div className="tab1-container">
      {isEditing ? (
        <div>
          <div className="tab-content">
            {items.map((item) => (
              <div
                key={item.id}
                className="item-box"
                onClick={() => handleItemClick(item)} // Opens the modal only when item box is clicked
              >
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-text-container">
                  <p className="item-title">{item.name}</p>
                  <p className="item-quantity">
                    Qty: {item.quantity}
                    <button
                      className="plus-icon-button"
                      onClick={(e) => increaseQuantity(item.id, e)} // Increase quantity without opening the modal
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      className="minus-icon-button"
                      onClick={(e) => decreaseQuantity(item.id, e)} // Decrease quantity without opening the modal
                    >
                      <AiOutlineMinus />
                    </button>
                  </p>
                  <p className="item-price">Price: ₱{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="tab-content">
          {items.map((item) => (
            <div key={item.id} className="item-box">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-text-container">
                <p className="item-title">{item.name}</p>
                <p className="item-quantity">
                  Qty: {item.quantity}
                  <button
                    className="plus-icon-button"
                    onClick={(e) => increaseQuantity(item.id, e)} // Increase quantity without opening the modal
                  >
                    <AiOutlinePlus />
                  </button>
                  <button
                    className="minus-icon-button"
                    onClick={(e) => decreaseQuantity(item.id, e)} // Decrease quantity without opening the modal
                  >
                    <AiOutlineMinus />
                  </button>
                </p>
                <p className="item-price">Price: ₱{item.price}</p>
              </div>
            </div>
          ))}
          <button
            className="review-order-button"
            onClick={() => setNavigateToReview(true)} // Trigger navigation state change
          >
            Review Order
          </button>
        </div>
      )}

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onSave={selectedItem ? handleEditProduct : handleAddProduct}
      />
    </div>
  );
};

export default Tab3;
