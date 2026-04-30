import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [burgers, setBurgers] = useState([]);

    const [newBurger, setNewBurger] = useState({
        name: '',
        price: '',
        image: '',
        category: 'Beef',
        description: ''
    });

    const fetchBurgers = async () => {
        try {
            const res = await axios.get('https://beebboo-backend.onrender.com/menu/menu');
            setBurgers(res.data); // Asumatti state update gochuun gaariidha
            return res.data;
        } catch (error) {
            console.error("Data fiduun hin danda'amne:", error);
            return [];
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            const loadBurgers = async () => {
                await fetchBurgers();
            };
            loadBurgers();
        }
    }, [isAuthenticated]);

    // --- FUNCTION BALLEESSUUTIIF (Dabalame) ---
    const deleteBurger = async (id) => {
        if (window.confirm("Dhuguma burger kana balleessuu barbaadduu?")) {
            try {
                const response = await fetch(`https://beebboo-backend.onrender.com/menu/menu/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'admin_secret': 'admin123'
                    }
                });

                if (response.ok) {
                    alert("Burger milkiin haqameera!");
                    fetchBurgers(); // Reload osoo hin taane data haaraa fiduu
                } else {
                    alert("Balleessuun hin danda'amne.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const handleAddBurger = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...newBurger,
                countInStock: 20
            };

            await axios.post('https://beebboo-backend.onrender.com/menu/menu', dataToSend, {
                headers: { 'admin_secret': 'admin123' }
            });

            alert("Burger haaraan milkiidhaan dabalameera!");
            setNewBurger({ name: '', price: '', image: '', category: 'Beef', description: '' });
            fetchBurgers();
        } catch {
            alert("Dabalachuun hin danda'amne! Backend mirkaneeffadhu.");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
        } else {
            alert("Password dogoggora!");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="login-overlay">
                <form className="login-card" onSubmit={handleLogin}>
                    <h2>Beebboo Admin Login</h2>
                    <input
                        type="password"
                        placeholder="Password Galchi..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Seeni</button>
                </form>
            </div>
        );
    }

    // Admin Dashboard View
    return (
        <div className="admin-container">
            <h2 className="admin-title">Beebboo Admin Panel</h2>

            <form className="add-burger-form" onSubmit={handleAddBurger}>
                <h3>Burger Haaraa Galchi</h3>
                <div className="form-group">
                    <input
                        type="text" placeholder="Maqaa Burger..."
                        value={newBurger.name}
                        onChange={(e) => setNewBurger({ ...newBurger, name: e.target.value })}
                        required
                    />
                    <input
                        type="number" placeholder="Gatii (ETB)..."
                        value={newBurger.price}
                        onChange={(e) => setNewBurger({ ...newBurger, price: e.target.value })}
                        required
                    />

                    <select
                        value={newBurger.category}
                        onChange={(e) => setNewBurger({ ...newBurger, category: e.target.value })}
                    >
                        <option value="Beef">Beef Burger</option>
                        <option value="Chicken">Chicken Burger</option>
                        <option value="Veggie">Veggie Burger</option>
                        <option value="Special">Special Beebboo</option>
                    </select>

                    <input
                        type="text" placeholder="URL Suuraa..."
                        value={newBurger.image}
                        onChange={(e) => setNewBurger({ ...newBurger, image: e.target.value })}
                        required
                    />

                    <textarea
                        placeholder="Ibsa dabalataa (Description)..."
                        value={newBurger.description}
                        onChange={(e) => setNewBurger({ ...newBurger, description: e.target.value })}
                    />

                    <button type="submit" className="btn-add">Dabalau +</button>
                </div>
            </form>

            <div className="burgers-section">
                <h3>Burgers List</h3>
                <div className="burger-list">
                    {burgers.length > 0 ? (
                        burgers.map((burger) => (
                            <div key={burger._id || burger.id} className="burger-item">
                                <div className="burger-info">
                                    <strong>{burger.name}</strong> - {burger.price} ETB
                                    <span className="category-tag">{burger.category}</span>
                                </div>
                                {/* --- BUTTON BALLEESSUU (ASITTI DABALAME) --- */}
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteBurger(burger._id)}
                                >
                                    Balleessi
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Hancaa jira... Burger'n hin jiru.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;