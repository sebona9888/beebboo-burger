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
    const [preview, setPreview] = useState(null); // Suuraa fe'ame sana arguuf
    const [loading, setLoading] = useState(false);

    // ✅ Suuraa yeroo filattu preview isaa agarsiisuuf
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshot(file);
            setPreview(URL.createObjectURL(file)); // Linkii yeroo gabaabaa uuma
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!BACKEND_URL) {
            alert("Backend URL hin argamne! Vercel Settings keessatti galchaa.");
            return;
        }

        const API_BASE = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;

        if (cartItems.length === 0) {
            alert("Korbofni keessan duwwaa dha!");
            return;
        }

        // Kaffaltii Screenshot dirqama gochuuf (Yoo Cash hin taane)
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
                data.append('screenshot', screenshot); // ✅ Multer backend irratti kana barbaada
            }

            await axios.post(`${API_BASE}/api/orders`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert(`Tole ${formData.fullName}, Ajajni keessan milkaa'eera!`);
            setPreview(null);
            setScreenshot(null);
            clearCart();

        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
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

                <div className="payment-section">
                    <label>Method Kaffaltii:</label>
                    <select name="paymentMethod" onChange={(e) => {
                        setFormData({ ...formData, paymentMethod: e.target.value });
                        if (e.target.value === 'Cash') { setPreview(null); setScreenshot(null); }
                    }}>
                        <option value="Cash">Cash (Kaffaltii harkaatti)</option>
                        <option value="Telebirr">Telebirr</option>
                        <option value="CBE">CBE (Bankii Daldala Itiyoophiyaa)</option>
                    </select>
                </div>

                {formData.paymentMethod !== 'Cash' && (
                    <div className="file-upload">
                        <label>Screenshot Kaffaltii Fe'i:</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} required />
                        {preview && (
                            <div className="image-preview">
                                <img src={preview} alt="Screenshot Preview" />
                            </div>
                        )}
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Ergamaa jira..." : `Order Now (${totalPrice} ETB)`}
                </button>
            </form>
        </div>
    );
};

export default Checkout;