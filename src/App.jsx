import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AdminDashboard from './components/AdminDashboard';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './Layouts/MainLayout';
// ✅ Kutaalee dabalataa (Optional: Akka component keetti check godhi)
// import Menu from './pages/Menu'; 
// import About from './pages/About';

// 1. Kutaa nageenyaa (ProtectedRoute) kanatti dabalame
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    // Yoo Admin miti ta'e gara Home tti deebisa
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            {/* ✅ Route-wwan dabalataa asitti dabalameera */}
            {/* <Route path="menu" element={<Menu />} /> */}
            {/* <Route path="about" element={<About />} /> */}
          </Route>

          {/* 2. AdminDashboard ProtectedRoute keessa galeera */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Yoo URL dogoggoraa barreesse gara Home-tti deebisa */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;