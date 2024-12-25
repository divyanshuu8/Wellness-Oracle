// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components for routing
import "./App.css"; // Make sure your global CSS is correctly applied
import Navbar from "./components/NavBar"; // Import the Navbar component
import Footer from "./components/Footer"; // Import the Footer component
import Home from "./components/Home"; // Import the Home component
import { Toaster } from "react-hot-toast";
import Product from "./components/Product";

function App() {
  return (
    <Router>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              border: "1px solid #1D264C",
              padding: "7px",
              color: "#1D264C",
              backgroundColor: "#8D93A5",
            },
            iconTheme: {
              primary: "#1D264C",
              secondary: "#8D93A5",
            },
          }}
        />
        <Navbar />
        <Routes>
          {/* Define the route for the Home component */}
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
