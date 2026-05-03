import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

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
        <nav className="navbar">
            {/* 1. Hamburger Menu (Bitaa irra) */}
            <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* 2. Logo (Gidduu ykn Bitaatti) */}
            <Link to="/" className="logo" style={logo3DStyle}>
                Beebboo <span style={burger3DStyle}>Burger</span>
            </Link>

            {/* 3. Navigation Links (PC irratti wal-cinaa, Mobile irratti Sidebar) */}
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><Link to="/" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Home</Link></li>
                <li><Link to="/menu" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Menu</Link></li>
                <li><Link to="/about" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Contact</Link></li>
                <li><Link to="/payment" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Payment</Link></li>
                <li><Link to="/admin" style={{ ...linkStyle, color: '#fff' }} onClick={closeMenu}>Admin</Link></li>
            </ul>

            {/* 4. Cart Icon (Mirga irra) */}
            <div className="nav-icons">
                <Link to="/cart" className="cart-btn" style={{ ...linkStyle, color: '#fff' }}>
                    🛒 <span className="cart-text">Cart ({cartCount})</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;