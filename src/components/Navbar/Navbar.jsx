import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    // Sidebar banuufi cufuuf
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const logo3DStyle = {
        textDecoration: 'none',
        display: 'inline-block',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '24px',
        textShadow: `1px 1px 0px #ccc, 2px 2px 0px #bbb, 3px 3px 0px #aaa, 4px 4px 5px rgba(0,0,0,0.5)`
    };

    const burger3DStyle = {
        color: '#ff9d00',
        textShadow: `1px 1px 0px #d48400, 2px 2px 0px #b06d00, 3px 3px 0px #8a5500, 4px 4px 5px rgba(0,0,0,0.5)`
    };

    return (
        <>
            {/* 1. MADDII (OVERLAY) - Bakka kana yoo tuqxe side bar-ichi ni cufama */}
            <div
                className={`nav-overlay ${isOpen ? 'active' : ''}`}
                onClick={closeMenu}
            ></div>

            <nav className="navbar">
                {/* 2. HAMBURGER ICON */}
                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                {/* 3. LOGO */}
                <Link to="/" className="logo" style={logo3DStyle}>
                    Beebboo <span style={burger3DStyle}>Burger</span>
                </Link>

                {/* 4. NAV LINKS (SIDEBAR) */}
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/" className="nav-item" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/menu" className="nav-item" onClick={closeMenu}>Menu</Link></li>
                    <li><Link to="/about" className="nav-item" onClick={closeMenu}>About</Link></li>
                    <li><Link to="/contact" className="nav-item" onClick={closeMenu}>Contact</Link></li>
                    <li><Link to="/payment" className="nav-item" onClick={closeMenu}>Payment</Link></li>
                    <li><Link to="/admin" className="nav-item" onClick={closeMenu}>Admin</Link></li>
                </ul>

                {/* 5. CART ICON */}
                <div className="nav-icons">
                    <Link to="/cart" className="cart-btn" style={{ textDecoration: 'none', color: '#fff' }}>
                        🛒 <span className="cart-badge">({cartCount})</span>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;