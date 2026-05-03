import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const location = useLocation();

    // auto close on page change
    useEffect(() => {
        if (!isOpen) return;

        const timeoutId = window.setTimeout(() => {
            setIsOpen(false);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [location, isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`overlay ${isOpen ? 'show' : ''}`}
                onClick={() => setIsOpen(false)}
            />

            <nav className={`navbar ${darkMode ? 'dark' : ''}`}>

                {/* Hamburger */}
                <div
                    className={`hamburger ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Logo */}
                <Link to="/" className="logo">
                    Beebboo <span>Burger</span>
                </Link>

                {/* Sidebar */}
                <ul className={`sidebar ${isOpen ? 'open' : ''}`}>

                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/payment">Payment</Link></li>
                    <li><Link to="/admin">Admin</Link></li>

                    {/* SETTINGS INSIDE SIDEBAR */}
                    <li>
                        <button
                            className="settings-btn"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                        </button>
                    </li>

                </ul>

                {/* Cart */}
                <div className="cart">
                    <Link to="/cart">🛒 ({cartCount})</Link>
                </div>

            </nav>
        </>
    );
};

export default Navbar;