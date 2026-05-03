import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`overlay ${isOpen ? 'show' : ''}`}
                onClick={() => setIsOpen(false)}
            />

            <nav className="navbar">

                {/* Hamburger */}
                <div
                    className={`hamburger ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Logo */}
                <Link to="/" className="logo">
                    Beebboo <span>Burger</span>
                </Link>

                {/* Desktop menu */}
                <ul className="nav-desktop">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>

                {/* Cart */}
                <div className="cart">
                    <Link to="/cart">🛒 ({cartCount})</Link>
                </div>

                {/* MOBILE SIDEBAR */}
                <ul className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link></li>
                    <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                    <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
                    <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link></li>
                </ul>

            </nav>
        </>
    );
};

export default Navbar;