import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    {/* Barreeffama guddaa fi socho'u */}
                    <h2 className="welcome-banner animate-slide-in">
                        WELCOME TO BEEBBOO BURGER
                    </h2>

                    <h1 className="animate-up main-title">
                        Nyaata Qulqulluu, <br />
                        <span>Beebboo Burger!</span>
                    </h1>

                    <p className="animate-up description-text">
                        Discover the best burger experience in Addis Ababa,
                        crafted with precision and premium ingredients.
                    </p>

                    <div className="hero-btns animate-up">
                        <Link to="/menu" className="btn btn-primary">ORDER NOW</Link>
                        <Link to="/about" className="btn btn-secondary">ABOUT US</Link>
                    </div>
                </div>

                <div className="hero-image-container">
                    <div className="blob-frame">
                        <img
                            src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop"
                            alt="Burger"
                            className="floating-burger"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;