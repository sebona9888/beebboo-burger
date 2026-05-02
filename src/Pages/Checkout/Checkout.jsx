import React, { useState } from 'react';
import { useCart } from '../../context/useCart';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();

    // ✅ ONLY use env variable (NO localhost fallback)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

        if (!BACKEND_URL) {
            alert("Backend URL hin jiruu! Vercel keessatti VITE_BACKEND_URL galchaa.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Korbofni keessan duwwaa dha!");
            return;
        }

        if (formData.paymentMethod !== 'Cash' && !screenshot) {
            alert("Screenshot kaffaltii barbaachisa!");
            return;
        }

        setLoading(true);

        try {
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

            console.log("Sending to:", BACKEND_URL);

            await axios.post(`${BACKEND_URL}/api/orders`, data);

            alert(`Tole ${formData.fullName}, Ajajni keessan milkaa'e!`);
            clearCart();

        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(err.response?.data?.message || "Error occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit}>
                <input name="fullName" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
                <input name="phone" placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                <textarea name="address" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />

                <select name="paymentMethod" onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}>
                    <option value="Cash">Cash</option>
                    <option value="Telebirr">Telebirr</option>
                    <option value="CBE">CBE</option>
                </select>

                {formData.paymentMethod !== 'Cash' && (
                    <input type="file" onChange={(e) => setScreenshot(e.target.files[0])} required />
                )}

                <button disabled={loading}>
                    {loading ? "Loading..." : "Order Now"}
                </button>
            </form>
        </div>
    );
};

export default Checkout;