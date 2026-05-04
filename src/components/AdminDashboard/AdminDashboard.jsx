import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [burgers, setBurgers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // --- DABALATA: EDIT STATE ---
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [newBurger, setNewBurger] = useState({
        name: '',
        price: '',
        image: '',
        category: 'Beef',
        description: ''
    });

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

    const fetchOrders = useCallback(async () => {
        try {
            const res = await axios.get('https://beebboo-backend.onrender.com/api/orders', {
                headers: { 'admin-secret': 'admin123' }
            });
            setOrders(res.data);
        } catch (error) {
            console.error("Orders fiduun hin danda'amne:", error);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBurgers();
            fetchOrders();
        }
    }, [isAuthenticated, fetchBurgers, fetchOrders]);

    const deleteBurger = async (id) => {
        if (window.confirm("Dhuguma burger kana balleessuu barbaadduu?")) {
            try {
                await axios.delete(`https://beebboo-backend.onrender.com/api/menu/${id}`, {
                    headers: { 'admin-secret': 'admin123' }
                });
                alert("Burger milkiin haqameera!");
                fetchBurgers();
            } catch {
                alert("Balleessuun hin danda'amne!");
            }
        }
    };

    // --- DABALATA: EDIT MODE SEENUU ---
    const startEdit = (burger) => {
        setIsEditing(true);
        setEditId(burger._id);
        setNewBurger({
            name: burger.name,
            price: burger.price,
            image: burger.image,
            category: burger.category,
            description: burger.description
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- DABALATA: CANCEL EDIT ---
    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setNewBurger({ name: '', price: '', image: '', category: 'Beef', description: '' });
    };

    const handleAddBurger = async (e) => {
        e.preventDefault();
        if (newBurger.price <= 0) return alert("Gatiin 0 gadi ta'uu hin qabu!");

        try {
            if (isEditing) {
                // UPDATE (PUT)
                await axios.put(`https://beebboo-backend.onrender.com/api/menu/${editId}`, newBurger, {
                    headers: { 'admin-secret': 'admin123' }
                });
                alert("Burger sirreeffameera!");
            } else {
                // CREATE (POST)
                const dataToSend = { ...newBurger, countInStock: 20 };
                await axios.post('https://beebboo-backend.onrender.com/api/menu', dataToSend, {
                    headers: { 'admin-secret': 'admin123' }
                });
                alert("Burger haaraan milkiidhaan dabalameera!");
            }
            cancelEdit();
            fetchBurgers();
        } catch {
            alert("Hojichi hin milkoofne!");
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        try {
            await axios.put(`https://beebboo-backend.onrender.com/api/orders/${id}`,
                { status: newStatus },
                { headers: { 'admin-secret': 'admin123' } });
            alert("Status jijjiirameera!");
            fetchOrders();
        } catch {
            alert("Status jijjiiruun hin danda'amne!");
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm("Ajaja kana haquu barbaaddu?")) {
            try {
                await axios.delete(`https://beebboo-backend.onrender.com/api/orders/${id}`, {
                    headers: { 'admin-secret': 'admin123' }
                });
                fetchOrders();
            } catch {
                alert("Haquun hin danda'amne!");
            }
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

    // --- DABALATA: LOGOUT ---
    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword("");
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

    return (
        <div className="admin-container">
            <div className="admin-header-flex">
                <h2 className="admin-title">Beebboo Admin Panel</h2>
                <button className="btn-logout" onClick={handleLogout}>Ba'i (Logout)</button>
            </div>

            {/* --- BURGER DABALUU / SIRREESSUU --- */}
            <form className="add-burger-form" onSubmit={handleAddBurger}>
                <h3>{isEditing ? "Burger Sirreessi" : "Burger Haaraa Galchi"}</h3>
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
                    <div className="form-buttons">
                        <button type="submit" className="btn-add">
                            {isEditing ? "Haaromsi" : "Dabalau +"}
                        </button>
                        {isEditing && (
                            <button type="button" className="btn-cancel" onClick={cancelEdit}>Dhiisi</button>
                        )}
                    </div>
                </div>
            </form>

            {/* --- LISTII BURGERS --- */}
            <div className="burgers-section">
                <h3>Burgers List</h3>
                <div className="burger-list">
                    {isLoading ? (
                        <p className="loading-text">Hancaa jira (Loading)...</p>
                    ) : (
                        burgers.map((burger) => (
                            <div key={burger._id} className="burger-item">
                                <div className="burger-info">
                                    <strong>{burger.name}</strong> - {burger.price} ETB
                                    <span className="category-tag">{burger.category}</span>
                                </div>
                                <div className="burger-actions">
                                    <button className="btn-edit" onClick={() => startEdit(burger)}>Edit</button>
                                    <button className="btn-delete" onClick={() => deleteBurger(burger._id)}>Balleessi</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* --- LISTII AJAJOOTAA (ORDERS) --- */}
            <div className="orders-section">
                <h3>Ajajoota (Orders)</h3>
                <div className="order-list">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order._id} className="order-item">
                                <div className="order-header">
                                    <strong>{order.fullName}</strong> ({order.phone})
                                    <span className={`status-tag ${order.status}`}>{order.status}</span>
                                </div>
                                <div className="order-details">
                                    <p>Address: {order.address}</p>
                                    <p>Gatii Waliigalaa: {order.totalPrice} ETB</p>
                                    <div className="items-ordered">
                                        {order.items.map((item, index) => (
                                            <span key={index}>{item.name} (x{item.quantity}), </span>
                                        ))}
                                    </div>
                                </div>

                                {order.screenshot && (
                                    <a href={order.screenshot} target="_blank" rel="noreferrer" className="btn-view">Suuraa Kaffaltii</a>
                                )}

                                <div className="order-actions">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    <button onClick={() => deleteOrder(order._id)} className="btn-delete">Haqi</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Ajajni dhufe hin jiru.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;