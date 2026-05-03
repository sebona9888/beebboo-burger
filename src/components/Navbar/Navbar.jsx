import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false); // Meenuu too'achuuf

    const toggleMenu = () => setIsOpen(!isOpen);

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
            <Link to="/" className="logo" style={logo3DStyle}>
                Beebboo <span style={burger3DStyle}>Burger</span>
            </Link>

            {/* Sarara Sadii (Hamburger) - Mobile irratti qofa mul'ata */}
            <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Nav Links - Mobile irratti sidebar ta'a */}
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><Link to="/" style={{ ...linkStyle, color: '#fff' }} onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><Link to="/menu" style={{ ...linkStyle, color: '#fff' }} onClick={() => setIsOpen(false)}>Menu</Link></li>
                <li><Link to="/about" style={{ ...linkStyle, color: '#fff' }} onClick={() => setIsOpen(false)}>About</Link></li>
                <li><Link to="/contact" style={{ ...linkStyle, color: '#fff' }} onClick={() => setIsOpen(false)}>Contact</Link></li>
                <li><Link to="/payment" style={{ ...linkStyle, color: '#fff' }} onClick={() => setIsOpen(false)}>Payment</Link></li>
                <li><Link to="/admin" style={{ ...linkStyle, color: '#fff' }} onClick={() => setIsOpen(false)}>Admin</Link></li>
            </ul>

            <div className="nav-icons">
                <Link to="/cart" className="cart-btn" style={{ ...linkStyle, color: '#fff' }}>
                    🛒 Cart ({cartCount})
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;