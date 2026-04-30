import React from 'react';
import { Outlet } from 'react-router-dom';

// Folder 'components' qubee xiqqaan jiraachuu isaa ijaan argineerra
// Maaloo folder 'Navbar' fi 'Footer' keessoo jiran qubee guddadiin ta'uu mirkaneessi
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import './MainLayout.css';

const MainLayout = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;