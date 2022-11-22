import axios from "axios";
// import  from "@mui/material/Card";
import { Button, Typography, Card } from "@mui/material";

function Shoe(props) {
  const shoe = props.shoe;
  const setError = props.setError;
  const fetchCart = props.fetchCart;

  //   console.log(shoe);

  const addOneShoe = async (shoe) => {
    try {
      console.log("Posting shoe to cart");
      await axios.post("/api/cart/" + shoe.styleID);
      console.log("Posted shoe to cart");
    } catch (error) {
      setError("Error adding shoe to cart: " + error);
    }
  };

  const addToCart = async () => {
    await addOneShoe(shoe);
    fetchCart();
  };

  return (
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
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default Shoe;
