import { useState, useEffect } from "react";
// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
// import importedShoes from "./shoes.js";
// import Card from "@mui/material/Card";
// import { Button, Typography } from "@mui/material";
import Shoe from "./Shoe.js";
import CartItem from "./CartItem.js";

function App() {
  // setup state
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCartItems(response.data);
      let count = 0;
      let price = 0;
      console.log("response: ", response);
      for (let i = 0; i < response.data.length; i++) {
        count += response.data[i].quantity;
        try {
          const shoe = await axios.get("/api/shoes/" + response.data[i].shoeID);
          price += shoe.data.retailPrice * response.data[i].quantity;
          console.log("price", price);
          console.log("shoe", shoe);
        } catch (error) {
          setError("Error getting shoe with associated shoe ID: " + error);
        }
        setTotal(count);
        setTotalPrice(price);
      }
      setTotal(count);
      setTotalPrice(price);
    } catch (error) {
      setError("Error retrieving cart items: " + error);
    }
  };

  // const addAllShoes = async () => {
  //   try {
  //     const response = await axios.get("/api/sneaks");
  //     // setShoes(response.data);
  //   } catch (error) {
  //     setError("Error adding all shoes to database: " + error);
  //   }
  // };

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
    // addAllShoes();
    fetchCart();
    getShoesInDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render results in web page
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: "lightblue",
      }}
    >
      {error}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          textAlign: "center",
          width: "100%",
          backgroundColor: "lightgrey",
          margin: "0px",
        }}
      >
        <div>
          <h1>Shoes</h1>

          {shoes.map((shoe) => (
            <Shoe
              shoe={shoe}
              setError={setError}
              fetchCart={fetchCart}
              key={shoe.styleID}
            />
          ))}
        </div>
        <div>
          <h1>Cart</h1>

          {cartItems.map((item) => (
            <CartItem
              item={item}
              setError={setError}
              shoeID={item.shoeID}
              key={item.shoeID}
              shoes={shoes}
              fetchCart={fetchCart}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignContent: "flex-start",
            margin: "10px",
            paddingRight: "20px",
            color: "inherit",
          }}
        >
          <h1>Cart Summary</h1>
          <h3>Items: {total}</h3>
          <h3>Total: ${totalPrice}</h3>
        </div>
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
