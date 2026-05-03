import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

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
            {/* Maddii (Overlay) - Bakka kana yoo tuqxe side bar-ichi ni cufama */}
            <div
                className={`nav-overlay ${isOpen ? 'active' : ''}`}
                onClick={closeMenu}
            ></div>

            <nav className="navbar">
                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <Link to="/" className="logo" style={logo3DStyle}>
                    Beebboo <span style={burger3DStyle}>Burger</span>
                </Link>

                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>
                    <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                    <li><Link to="/payment" onClick={closeMenu}>Payment</Link></li>
                    <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
                </ul>

                <div className="nav-icons">
                    <Link to="/cart" className="cart-btn" style={{ textDecoration: 'none', color: '#fff' }}>
                        🛒 ({cartCount})
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;