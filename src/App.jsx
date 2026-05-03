import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AdminDashboard from './components/AdminDashboard'; // Import gochuu hin dagatin
import Home from './pages/Home'; // Home page kee
import ScrollToTop from './components/ScrollToTop'; // ScrollToTop component kee
import MainLayout from './Layouts/MainLayout'; // MainLayout component kee

function App() {

  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;



