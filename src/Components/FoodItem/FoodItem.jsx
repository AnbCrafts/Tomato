import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Ensure cartItems is an object and handle undefined values for id
  const cartCount = cartItems && cartItems[id] ? cartItems[id] : 0;

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img src={`${url}/images/${image}`} alt="" className="food-item-image" />
        {
          cartCount === 0
            ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
            : <div className="food-item-counter">
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartCount}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}
