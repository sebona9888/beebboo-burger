import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const location = useLocation();

    // auto close sidebar when route changes
    useEffect(() => {
        setTimeout(() => {
            setIsOpen(false);
            setShowSettings(false);
        }, 0);
    }, [location]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <>
            {/* Overlay */}
            <div
                className={`nav-overlay ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
            ></div>

            <nav className={`navbar ${darkMode ? 'dark' : ''}`}>

                {/* Hamburger */}
                <div
                    className={`hamburger ${isOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Logo */}
                <Link to="/" className="logo">
                    Beebboo <span>Burger 🍔</span>
                </Link>

                {/* Links */}
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/payment">Payment</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>

                {/* Right Side */}
                <div className="nav-icons">

                    {/* SETTINGS */}
                    <div className="settings">
                        <button
                            className="settings-btn"
                            onClick={() => setShowSettings(!showSettings)}
                        >
                            ⚙️
                        </button>

                        {showSettings && (
                            <div className="settings-menu">
                                <button onClick={toggleTheme}>
                                    {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
                                </button>

                                <Link to="/admin">Admin Panel</Link>

                                <button onClick={() => alert("Notifications ON 🔔")}>
                                    Notifications
                                </button>
                            </div>
                        )}
                    </div>

                    {/* CART */}
                    <Link to="/cart" className="cart">
                        🛒 ({cartCount})
                    </Link>

                </div>
            </nav>
        </>
    );
};

export default Navbar;