import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // 3D Logo Styles
    const linkStyle = {
        textDecoration: 'none',
        display: 'inline-block'
    };

    const logo3DStyle = {
        ...linkStyle,
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
            {/* 1. Maddii (Overlay) - Sidebar ala yeroo tuqamu akka cufamuuf */}
            <div
                className={`nav-overlay ${isOpen ? 'active' : ''}`}
                onClick={closeMenu}
            ></div>

            <nav className="navbar">
                {/* 2. Hamburger Menu (Bitaa irra) */}
                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                {/* 3. Logo */}
                <Link to="/" className="logo" style={logo3DStyle}>
                    Beebboo <span style={burger3DStyle}>Burger</span>
                </Link>

                {/* 4. Navigation Links (Sidebar) */}
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/menu" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Menu</Link></li>
                    <li><Link to="/about" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>About</Link></li>
                    <li><Link to="/contact" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Contact</Link></li>
                    <li><Link to="/payment" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Payment</Link></li>
                    <li><Link to="/admin" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Admin</Link></li>
                </ul>

                {/* 5. Cart Icon (Mirga irra) */}
                <div className="nav-icons">
                    <Link to="/cart" className="cart-btn" style={{ ...linkStyle, color: '#fff' }}>
                        🛒 <span className="cart-text">({cartCount})</span>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;