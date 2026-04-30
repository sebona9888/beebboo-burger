import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AdminDashboard from './components/AdminDashboard'; // Import gochuu hin dagatin
import Home from './pages/Home'; // Home page kee

function App() {
  return (
    <Router>
      <CartProvider>
        {/* Navigaiton-ni kee asitti jiraachuu danda'a */}
        <Routes>
          {/* Route Home */}
          <Route path="/" element={<Home />} />

          {/* Route Admin Dashboard haaraa ati gaafatte */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;