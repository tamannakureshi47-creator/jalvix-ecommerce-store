
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Product2 from "./pages/Product2";
import Cart from "./pages/Cart";
import CategoryProduct from "./pages/CategoryProduct";
import SingleProduct from "./pages/SingleProduct";

import { DataProvider } from "./context/DataContext";
import { DataProvider as NewDataProvider } from "./context/NewDataContext";



function App() {
  return (
    <DataProvider>
      <NewDataProvider>
        <BrowserRouter>
          <div className="storefront-app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/product" element={<Products />} />
              <Route path="/product2" element={<Product2 />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/category/:category"
                element={<CategoryProduct />}
              />
              <Route
                path="/single-product/:id"
                element={<SingleProduct />}
              />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </NewDataProvider>
    </DataProvider>
  );
}

export default App;
