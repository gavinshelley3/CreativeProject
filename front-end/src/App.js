import { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
import importedShoes from "./shoes.js";

function App() {
  
  // setup state
  const [shoes, setShoes] = useState([
    "{}"
    ]);
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
  
    const addAllShoes = async() => {
    try{
      for(let i = 0; i < importedShoes.length; i ++){
        let product = importedShoes[i];
        let request = {name: product.name, price: product.price};
        axios.post("/api/shoes", request);
      }
    } catch(error){
      setError("Error adding all shoes to database: " + error);
    }
  };
  
    const getShoesInDb = async() => {
    try{
      const response = await axios.get("/api/products");
      setShoes(response.data);
    } catch(error){
      setError("Error in getting shoes from database: " + error);
    } 
  };
  
  const getShoes = async() => {
    try {
      await sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
          console.log(products);
      });
    } catch (err) {
      setError("Error in getting sneaker data: " + err);
    }
  };

  
  return (
    <div className="App">
      <button onClick = "getShoes()">Get Shoes</button>
    </div>
  );
}

export default App;
