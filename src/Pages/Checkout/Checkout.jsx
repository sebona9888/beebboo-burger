import React, { useState } from 'react';
// 1. Path kallaattii file 'useCart' irratti jijjiirameera
import { useCart } from '../../context/useCart';
import './Checkout.css';

const Checkout = () => {
    // 2. 'clearCart' dabalameera
    const { cartItems, totalPrice, clearCart } = useCart();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        paymentMethod: 'Cash'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Korbofni keessan duwwaa dha. Maaloo dura nyaata filadhaa!");
            return;
        }

        alert(`Tole ${formData.fullName}, Ajajni keessan fudhatameera!`);
        console.log("Order Details:", { items: cartItems, customer: formData, total: totalPrice });

        // Ajajni erga mirkanaa'ee booda korboo qulqulleessuuf
        clearCart();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="checkout-container fade-in">
            <h1>Checkout</h1>
            <div className="checkout-content">

                {/* Form Odeeffannoo Sassaabu */}
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h3>Odeeffannoo Keessan</h3>
                    <div className="input-group">
                        <input type="text" name="fullName" placeholder="Maqaa Guutuu" onChange={handleChange} required />
                        <input type="tel" name="phone" placeholder="Lakkoofsa Bilbilaa" onChange={handleChange} required />
                        <textarea name="address" placeholder="Teessoo (Address) Keessan" onChange={handleChange} required></textarea>
                    </div>

                    <h3>Kaffaltii</h3>
                    <select name="paymentMethod" onChange={handleChange} className="payment-select">
                        <option value="Cash">Cash on Delivery</option>
                        <option value="Telebirr">Telebirr</option>
                        <option value="CBE">CBE Birr</option>
                    </select>
                    <button type="submit" className="confirm-btn">Ajaja Mirkaneessi</button>
                </form>

                {/* Summary Ajajaa */}
                <div className="order-summary">
                    <h3>Ajaja Keessan</h3>
                    <div className="summary-list">
                        {cartItems.map(item => (
                            // 'item.id' gara 'item._id' tti jijjiirameera
                            <div key={item._id} className="summary-item">
                                <span>{item.name} (x{item.qty})</span>
                                <span>{(item.price * item.qty).toLocaleString()} ETB</span>
                            </div>
                        ))}
                    </div>

                    {cartItems.length === 0 && <p className="empty-msg">Korboon keessan duwwaa dha.</p>}

                    <hr />
                    <div className="summary-total">
                        <strong>Waliigala:</strong>
                        <strong>{totalPrice.toLocaleString()} ETB</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;