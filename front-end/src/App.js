import { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
const SneaksAPI = require("sneaks-api");

function App() {
  
  // setup state
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState("");
  const [cartItem, setCartItems] = useState([]);

  const fetchCart = async() => {
    try{
      const response = await axios.get("/api/cart");
      setCartItems(response.data);
    } catch(error) {
      setError("Error retrieving cart items: " + error);
    }
  };

  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
