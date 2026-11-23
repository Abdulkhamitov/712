import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import ContactSuccess from './components/ContactSuccess';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Мой Магазин</h1>
          <ul className="nav-list">
            <li><NavLink to="/" end>Главная</NavLink></li>
            <li><NavLink to="/about">О нас</NavLink></li>
            <li><NavLink to="/products">Товары</NavLink></li>
            <li><NavLink to="/contact">Контакты</NavLink></li>
            <li><NavLink to="/admin">Админка (защищено)</NavLink></li>
          </ul>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/success" element={<ContactSuccess />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={false}>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
