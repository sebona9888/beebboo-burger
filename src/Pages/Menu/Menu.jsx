import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import './Menu.css';

const Menu = () => {
    const [burgers, setBurgers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Burger filatame modal irratti agarsiisuuf
    const [selectedBurger, setSelectedBurger] = useState(null);

    const cart = useContext(CartContext);
    const addToCart = cart ? cart.addToCart : null;

    useEffect(() => {
        const fetchBurgers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://beebboo-backend.onrender.com/menu/menu');
                if (response.data) {
                    setBurgers(response.data);
                    setError(null);
                }
            } catch (err) {
                console.error("❌ Error:", err);
                setError("Backend irraa data fiduun hin danda'amne.");
            } finally {
                setLoading(false);
            }
        };
        fetchBurgers();
    }, []);

    if (loading) return <div className="loader">Fe'amaa jira...</div>;
    if (error) return <div className="error-msg">{error}</div>;

    return (
        <section className="menu-section">
            <div className="menu-container">
                <h1 className="menu-title">Menu <span>Beebboo</span></h1>
                <p className="menu-subtitle">Qulqullina addaa, dhandhama iccitii Beebboo!</p>

                <div className="menu-grid">
                    {burgers.length > 0 ? (
                        burgers.map((item) => (
                            <div key={item._id} className="menu-card" onClick={() => setSelectedBurger(item)}>
                                <div className="badge-fresh">Dhandhama Haaraa</div>
                                <div className="menu-img-box">
                                    <img src={item.img || item.image} alt={item.name} />
                                </div>
                                <div className="menu-info">
                                    <h3>{item.name}</h3>
                                    <p className="menu-desc">✨ {item.description || item.desc || "Mi'aa addaa qaba."}</p>
                                    <div className="menu-footer">
                                        <span className="price">{item.price} ETB</span>
                                        <button className="view-btn">Ilaali</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Burger'n hin jiru.</p>
                    )}
                </div>
            </div>

            {/* --- BURGER MODAL (Yeroo cuqaasamu kan banamu) --- */}
            {selectedBurger && (
                <div className="modal-overlay" onClick={() => setSelectedBurger(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedBurger(null)}>&times;</button>
                        
                        <div className="modal-body">
                            <div className="modal-img-container">
                                <img src={selectedBurger.img || selectedBurger.image} alt={selectedBurger.name} />
                            </div>
                            <div className="modal-details">
                                <h2>{selectedBurger.name}</h2>
                                <p className="modal-category">Kategori: <span>{selectedBurger.category || "Beef"}</span></p>
                                
                                <div className="benefit-box">
                                    <h4>Maaliif filatama?</h4>
                                    <p>{selectedBurger.description || "Burger kun dhandhama haaraa fi qulqullina loonii irraa kan qophaa'edha."}</p>
                                    <ul>
                                        <li>✅ 100% Organic Foon</li>
                                        <li>✅ Kuduraa Haaraa</li>
                                        <li>✅ Zayita malee kan dubbifame</li>
                                    </ul>
                                </div>

                                <div className="modal-action">
                                    <span className="modal-price">{selectedBurger.price} ETB</span>
                                    <button 
                                        className="add-btn-large"
                                        onClick={() => {
                                            addToCart && addToCart(selectedBurger);
                                            setSelectedBurger(null);
                                        }}
                                    >
                                        Amma Ajajadhu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Menu;