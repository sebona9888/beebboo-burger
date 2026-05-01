import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();

    // Linkiiwwan akka hin banneef bifa qulqulluun sirreessuuf
    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit', // Halluu isaa dizaayinii CSS irraa fudhata
        display: 'inline-block'
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo" style={linkStyle}>
                Beebboo <span style={{ color: '#ff9d00' }}>Burger</span>
            </Link>

            <ul className="nav-links">
                <li><Link to="/" style={linkStyle}>Home</Link></li>
                <li><Link to="/menu" style={linkStyle}>Menu</Link></li>
                <li><Link to="/about" style={linkStyle}>About</Link></li>
                <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
                <li><Link to="/payment" style={linkStyle}>Payment</Link></li>
                <li><Link to="/admin" style={linkStyle}>Admin</Link></li>
            </ul>

            <div className="nav-icons">
                <Link to="/cart" className="cart-btn" style={{ ...linkStyle, color: '#000' }}>
                    🛒 Cart ({cartCount})
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;