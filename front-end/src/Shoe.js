import axios from "axios";
import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";

function Shoe(props) {
  const shoe = props.shoe;
  const setError = props.setError;
  const fetchCart = props.fetchCart;

  //   console.log(shoe);

  const addOneShoe = async (shoe) => {
    try {
      console.log("Adding shoe to cart");
      const url = "/api/cart/" + shoe.styleID;

      console.log("shoe", shoe);
      console.log(url);

      //   debugger;
      await axios.post("/api/cart/" + shoe.styleID);
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
      <div key={shoe.id}>
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
          <Typography sx={{ margin: "10px", width: "200px" }}>
            <h3>{shoe.shoeName}</h3>
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
          }}
        >
          <Typography>Retail: ${shoe.retailPrice}</Typography>
          <Typography>StockX: ${shoe.lowestResellPrice.stockX}</Typography>
          <Typography>GOAT: ${shoe.lowestResellPrice.goat}</Typography>
          <Typography>
            Flight Club: ${shoe.lowestResellPrice.flightClub}
          </Typography>
          <Typography>
            Stadium Goods: ${shoe.lowestResellPrice.stadiumGoods}
          </Typography>
        </div>
        <Button onClick={addToCart}> click here </Button>
      </div>
    </Card>
  );
}

export default Shoe;
