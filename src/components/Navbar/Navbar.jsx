import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Overlay */}
            <div
                className={`nav-overlay ${isOpen ? 'active' : ''}`}
                onClick={closeMenu}
            ></div>

            <nav className="navbar">

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
                <Link to="/" className="logo" onClick={closeMenu}>
                    Beebboo <span>Burger</span>
                </Link>

                {/* Links */}
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>
                    <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                    <li><Link to="/payment" onClick={closeMenu}>Payment</Link></li>
                    <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
                </ul>

                {/* Cart */}
                <div className="nav-icons">
                    <Link to="/cart" onClick={closeMenu}>
                        🛒 ({cartCount})
                    </Link>
                </div>

            </nav>
        </>
    );
};

export default Navbar;