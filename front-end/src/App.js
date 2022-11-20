import { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import importedShoes from "./shoes.js";
import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";
import Shoe from "./Shoe.js";
import CartItem from "./CartItem.js";

function App() {
  // setup state
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState("");

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCartItems(response.data);
      let cartTotal = 0.0;
      for (let i = 0; i < cartItems.length; i++) {
        cartTotal += parseFloat(cartItems[i].price) * cartItems[i].quantity;
      }
      setTotal(cartTotal.toFixed(2).toString());
      console.log(cartTotal);
    } catch (error) {
      setError("Error retrieving cart items: " + error);
    }
  };

  const addAllShoes = async () => {
    try {
      const response = await axios.get("/api/sneaks");
      // setShoes(response.data);
    } catch (error) {
      setError("Error adding all shoes to database: " + error);
    }
  };

  const getShoesInDb = async () => {
    try {
      const response = await axios.get("/api/shoes");
      setShoes(response.data);
    } catch (error) {
      setError("Error in getting shoes from database: " + error);
    }
  };

  // Fetch shoes data
  useEffect(() => {
    addAllShoes();
    getShoesInDb();
  }, []);

  // Render results in web page
  return (
    <div className="App">
      {error}
      <div className="shoes-list">
        <h1>Shoes</h1>

        {shoes.map((shoe) => (
          <Shoe
            shoe={shoe}
            setError={setError}
            fetchCart={fetchCart}
            key={shoe.id}
          />
        ))}
      </div>
      <div className="spacer"></div>
      <div>
        <h1>Cart</h1>

        {cartItems.map((item) => (
          <CartItem
            item={item}
            setError={setError}
            key={item.id}
            shoes={shoes}
            fetchCart={fetchCart}
          />
        ))}
      </div>

      <div>
        <h1>Total</h1>
        <h3>${total}</h3>
      </div>
      <div>
        <p>
          Created by:{" "}
          <a href="https://github.com/ELKerr97/CreativeProject">
            Ethan Kerr and Gavin Shelley
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
