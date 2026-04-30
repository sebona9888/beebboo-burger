import React from 'react';
import { Link } from 'react-router-dom';
// Path kana './useCart' tti jijjiiri
import { useCart } from '../../context/useCart';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Beebboo <span>Burger</span>
            </Link>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>

            <div className="nav-icons">
                <Link to="/cart" className="cart-btn">
                    🛒 Cart ({cartCount})
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;