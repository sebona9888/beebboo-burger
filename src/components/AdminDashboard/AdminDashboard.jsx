import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [burgers, setBurgers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [newBurger, setNewBurger] = useState({
        name: '',
        price: '',
        image: '',
        category: 'Beef',
        description: ''
    });

    // ✅ Load admin from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("isAdmin");
        if (saved === "true") {
            setIsAuthenticated(true);
        } else {
            navigate("/"); // block access
        }
    }, [navigate]);

    // --- FETCH BURGERS ---
    const fetchBurgers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('https://beebboo-backend.onrender.com/api/menu');
            setBurgers(res.data);
        } catch (error) {
            console.error("Data fiduun hin danda'amne:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBurgers();
        }
    }, [isAuthenticated, fetchBurgers]);

    // --- DELETE BURGER ---
    const deleteBurger = async (id) => {
        if (window.confirm("Dhuguma burger kana balleessuu barbaadduu?")) {
            try {
                const response = await axios.delete(
                    `https://beebboo-backend.onrender.com/api/menu/${id}`,
                    {
                        headers: {
                            'admin_secret': import.meta.env.VITE_ADMIN_SECRET || 'admin123'
                        }
                    }
                );

                if (response.status === 200) {
                    alert("Burger milkiin haqameera!");
                    fetchBurgers();
                }
            } catch {
                alert("Balleessuun hin danda'amne!");
            }
        }
    };

    // --- ADD BURGER ---
    const handleAddBurger = async (e) => {
        e.preventDefault();

        if (newBurger.price <= 0) {
            return alert("Gatiin 0 gadi ta'uu hin qabu!");
        }

        try {
            const dataToSend = { ...newBurger, countInStock: 20 };

            await axios.post(
                'https://beebboo-backend.onrender.com/api/menu',
                dataToSend,
                {
                    headers: {
                        'admin_secret': import.meta.env.VITE_ADMIN_SECRET || 'admin123'
                    }
                }
            );

            alert("Burger haaraan milkiidhaan dabalameera!");

            setNewBurger({
                name: '',
                price: '',
                image: '',
                category: 'Beef',
                description: ''
            });

            fetchBurgers();
        } catch {
            alert("Dabalachuun hin danda'amne!");
        }
    };

    // --- LOGIN ---
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
            localStorage.setItem("isAdmin", "true");
        } else {
            alert("Password dogoggora!");
        }
    };

    // --- LOGOUT ---
    const logout = () => {
        localStorage.removeItem("isAdmin");
        window.location.href = "/";
    };

    // --- LOGIN SCREEN ---
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

    // --- ADMIN PANEL ---
    return (
        <div className="admin-container">
            <button onClick={logout} style={{ marginBottom: "10px" }}>
                Logout
            </button>

            <h2 className="admin-title">Beebboo Admin Panel</h2>

            <form className="add-burger-form" onSubmit={handleAddBurger}>
                <h3>Burger Haaraa Galchi</h3>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Maqaa Burger..."
                        value={newBurger.name}
                        onChange={(e) => setNewBurger({ ...newBurger, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Gatii (ETB)..."
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
                        type="text"
                        placeholder="URL Suuraa..."
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
                    {isLoading ? (
                        <p className="loading-text">Hancaa jira (Loading)...</p>
                    ) : burgers.length > 0 ? (
                        burgers.map((burger) => (
                            <div key={burger._id} className="burger-item">
                                <div className="burger-info">
                                    <strong>{burger.name}</strong> - {burger.price} ETB
                                    <span className="category-tag">{burger.category}</span>
                                </div>
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteBurger(burger._id)}
                                >
                                    Balleessi
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Burger'n hin jiru.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;