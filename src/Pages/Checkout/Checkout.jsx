import React, { useState } from 'react';
import { useCart } from '../../context/useCart';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
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
            alert("Vercel irratti VITE_BACKEND_URL hin argamne!");
            return;
        }

        // Linkii dhumarratti '/' yoo qabaate qulqulleessuuf
        const API_BASE = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;

        if (cartItems.length === 0) {
            alert("Korbofni keessan duwwaa dha!");
            return;
        }

        if (formData.paymentMethod !== 'Cash' && !screenshot) {
            alert("Maaloo, screenshot kaffaltii fe'aa!");
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

            // Headers 'multipart/form-data' ta'uu isaa mirkaneessi
            await axios.post(`${API_BASE}/api/orders`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert(`Tole ${formData.fullName}, Ajajni keessan milkaa'eera!`);
            clearCart();

        } catch (err) {
            console.error("Error Details:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Dogoggorri uumameera!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <input name="fullName" placeholder="Maqaa Guutuu" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
                <input name="phone" placeholder="Bilbila" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                <textarea name="address" placeholder="Teessoo" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />

                <select name="paymentMethod" onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}>
                    <option value="Cash">Cash</option>
                    <option value="Telebirr">Telebirr</option>
                    <option value="CBE">CBE</option>
                </select>

                {formData.paymentMethod !== 'Cash' && (
                    <input type="file" accept="image/*" onChange={(e) => setScreenshot(e.target.files[0])} required />
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Ergamaa jira..." : `Order Now (${totalPrice} ETB)`}
                </button>
            </form>
        </div>
    );
};

export default Checkout;