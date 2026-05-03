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
            {/* Overlay - Ensuring it doesn't block the sidebar */}
            <div
                className={`nav-overlay ${isOpen ? 'active' : ''}`}
                onMouseDown={closeMenu}
            ></div>

            <nav className="navbar">
                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <Link to="/" className="logo">
                    Beebboo <span className="burger-text">Burger</span>
                </Link>

                {/* Added 'active-sidebar' class for explicit control */}
                <ul className={`nav-links ${isOpen ? 'open active-sidebar' : ''}`}>
                    <li><Link to="/" onClick={closeMenu} onMouseUp={closeMenu}>Home</Link></li>
                    <li><Link to="/menu" onClick={closeMenu} onMouseUp={closeMenu}>Menu</Link></li>
                    <li><Link to="/about" onClick={closeMenu} onMouseUp={closeMenu}>About</Link></li>
                    <li><Link to="/contact" onClick={closeMenu} onMouseUp={closeMenu}>Contact</Link></li>
                    <li><Link to="/admin" onClick={closeMenu} onMouseUp={closeMenu}>Admin</Link></li>
                </ul>

                <div className="nav-icons">
                    <Link to="/cart" className="cart-btn">
                        🛒 ({cartCount})
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;