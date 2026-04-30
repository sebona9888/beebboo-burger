import React from 'react';
import './CartItem.css';

const CartItem = ({ item, updateQty, removeItem }) => {
    return (
        <div className="cart-item">
            <div className="cart-item-img">
                <img src={item.img} alt={item.name} />
            </div>
            <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.price} ETB</p>
            </div>
            <div className="cart-item-qty">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
            </div>
            <div className="cart-item-total">
                {(item.price * item.qty).toLocaleString()} ETB
            </div>
            <button className="remove-btn" onClick={() => removeItem(item.id)}>
                🗑️
            </button>
        </div>
    );
};

export default CartItem;