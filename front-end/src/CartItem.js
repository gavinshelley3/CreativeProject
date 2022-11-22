import axios from "axios";
import { Button, Typography, Card } from "@mui/material";
import { useState, useEffect } from "react";

function CartItem(props) {
  const setError = props.setError;
  //   const shoes = props.shoes;
  const shoeID = props.shoeID;
  const quantity = props.item.quantity;
  //   const shoe = getShoe(shoeID);
  const [shoe, setShoe] = useState([]);
  //   const [cart, setCart] = useState([]);
  //   const cart = getCart();
  const fetchCart = props.fetchCart;
  //   const [shoeName, setProductName] = useState("");

  useEffect(() => {
    getShoe(shoeID);
    // getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getShoe = async (shoeID) => {
    try {
      const response = await axios.get("/api/cart/" + shoeID);
      //   console.log("response", response);
      setShoe(response.data);
    } catch (error) {
      const shoe = null;
      setError("Error getting shoe with associated shoe ID: " + error);
      return shoe;
    }
  };

  //   const getCart = async () => {
  //     try {
  //       const response = await axios.get("/api/cart");
  //       setCart(response.data);
  //     } catch (error) {
  //       setError("Error getting cart: " + error);
  //     }
  //   };

  const increment = async () => {
    await incrementOneItem(shoeID);
    fetchCart();
  };

  const incrementOneItem = async () => {
    try {
      await axios.put("/api/cart/" + shoeID + "/" + (quantity + 1));
    } catch (error) {
      setError("Error adding product to cart: " + error);
    }
  };

  const decrement = async () => {
    await decrementOneItem(shoeID);
    fetchCart();
  };

  const decrementOneItem = async () => {
    try {
      if (quantity === 1) {
        await remove(shoeID);
      } else {
        await axios.put("/api/cart/" + shoeID + "/" + (quantity - 1));
      }
    } catch (error) {
      setError("Error decrementing product in cart: " + error);
    }
  };

  const remove = async () => {
    await removeItem(shoeID);
    fetchCart();
  };

  const removeItem = async () => {
    try {
      console.log("Removing item with shoeID: " + shoeID);
      await axios.delete("/api/cart/" + shoeID);
    } catch (error) {
      setError("Error deleting item from cart: " + error);
    }
  };

  return (
    <div className="CartItem">
      <div key={shoeID}>
        <Card
          sx={{
            // color: "primary.dark",
            width: "400px",
            height: "400px",
            margin: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid black",
            borderRadius: 3,
            boxShadow: 1,
            backgroundColor: "primary.light",
          }}
        >
          <div key={shoe.styleID}>
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <img
                style={{
                  width: "200px",
                  height: "auto",
                  margin: "auto",
                  borderRadius: "5px",
                }}
                src={shoe.thumbnail}
                alt="shoe"
              ></img>
              <Typography variant="h5" sx={{ margin: "10px", width: "200px" }}>
                <b>{shoe.shoeName}</b>
              </Typography>
            </div>
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "10px",
                margin: "20px 0px 0px 0px",
                alignItems: "flex-start",
              }}
            >
              <Typography>Retail: ${shoe.retailPrice}</Typography>
              <Typography>
                StockX: $
                {shoe.lowestResellPrice === undefined ||
                shoe.lowestResellPrice === null
                  ? " -"
                  : shoe.lowestResellPrice.stockX}
              </Typography>
              <Typography>
                GOAT: $
                {shoe.lowestResellPrice === undefined ||
                shoe.lowestResellPrice.goat === undefined
                  ? " -"
                  : shoe.lowestResellPrice.goat}
              </Typography>
              <Typography>
                Flight Club: $
                {shoe.lowestResellPrice === undefined ||
                shoe.lowestResellPrice.flightClub === undefined
                  ? " -"
                  : shoe.lowestResellPrice.flightClub}
              </Typography>
              <Typography>
                Stadium Goods: $
                {shoe.lowestResellPrice === undefined ||
                shoe.lowestResellPrice.stadiumGoods === undefined
                  ? " -"
                  : shoe.lowestResellPrice.stadiumGoods}
              </Typography>
            </div>
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "10px",
                margin: "0px 0px 20px 0px",
                alignItems: "flex-start",
              }}
            >
              <Button
                sx={{
                  width: "80px",
                  margin: "auto",
                  backgroundColor: "primary.dark",
                  color: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "primary.dark",
                  },
                }}
                onClick={(e) => increment()}
              >
                +
              </Button>
              <Typography sx={{ margin: "auto" }}>{quantity}</Typography>
              <Button
                sx={{
                  width: "80px",
                  margin: "auto",
                  backgroundColor: "primary.dark",
                  color: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "primary.dark",
                  },
                }}
                onClick={(e) => decrement()}
              >
                -
              </Button>
              <Button
                sx={{
                  width: "100px",
                  margin: "auto",
                  backgroundColor: "primary.dark",
                  color: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "primary.dark",
                  },
                }}
                onClick={(e) => remove()}
              >
                Remove from Cart
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CartItem;
