import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import PovesteaPage from './pages/PovesteaPage';
import ProductiePage from './pages/ProductiePage';
import ProdusePage from './pages/ProdusePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/povestea" element={<PovesteaPage />} />
          <Route path="/productie" element={<ProductiePage />} />
          <Route path="/produse" element={<ProdusePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;