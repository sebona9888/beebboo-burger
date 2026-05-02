import React, { useState } from 'react';
import { useCart } from '../../context/useCart';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();

    // BACKEND_URL: Yoo Vercel irratti fe'ameera ta'e URL Render kee fayyadama, 
    // yoo kompiitara kee irratti ta'e ammoo localhost fayyadama.
    const BACKEND_URL = (typeof process !== 'undefined' && process.env.REACT_APP_BACKEND_URL) || 'http://localhost:5000';

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        paymentMethod: 'Cash'
    });

    const [screenshot, setScreenshot] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Korbofni keessan duwwaa dha. Maaloo dura nyaata filadhaa!");
            return;
        }

        if (formData.paymentMethod !== 'Cash' && !screenshot) {
            alert("Maaloo, dura screenshot kaffaltii galchaa!");
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('paymentMethod', formData.paymentMethod);
        data.append('totalPrice', totalPrice);
        data.append('items', JSON.stringify(cartItems));

        if (screenshot) {
            data.append('screenshot', screenshot);
        }

        try {
            // URL asirratti BACKEND_URL fayyadami
            const response = await axios.post(`${BACKEND_URL}/api/orders`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                alert(`Tole ${formData.fullName}, Ajajni keessan milkiin fudhatameera!`);
                clearCart();
            }
        } catch (error) {
            console.error("Order Error details:", error.response ? error.response.data : error.message);
            alert("Ajaja erguu irratti rakkoon uumameera. Maaloo irra deebiaa yaalaa.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setScreenshot(e.target.files[0]);
    };

    return (
        <div className="checkout-container fade-in">
            <h1>Checkout</h1>
            <div className="checkout-content">
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

                    {formData.paymentMethod !== 'Cash' && (
                        <div className="screenshot-upload" style={{ marginTop: '20px', padding: '15px', border: '1px dashed #facc15', borderRadius: '10px' }}>
                            <p style={{ fontSize: '0.8rem', color: '#facc15', marginBottom: '10px' }}>
                                * Maaloo kaffaltii kaffaltanii screenshot ergaa.
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ color: 'white' }}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="confirm-btn" disabled={loading}>
                        {loading ? "Eegamaa jira..." : "Ajaja Mirkaneessi"}
                    </button>
                </form>

                <div className="order-summary">
                    <h3>Ajaja Keessan</h3>
                    <div className="summary-list">
                        {cartItems.map(item => (
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