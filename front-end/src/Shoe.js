import axios from 'axios';
import Card from '@mui/material/Card';
import { Button, Typography } from '@mui/material';



function Shoe(props){
    const shoe = props.shoe;
    const setError = props.setError;
    const fetchCart = props.fetchCart;
    
    const addOneShoe = async(shoe) => {
        try {
            await axios.post("/api/cart/" + shoe.id);
        } catch (error) {
            setError("Error adding shoe to cart: " + error);
        }
    };
    
    const addToCart = async(shoe) => {
        await addOneShoe(shoe);
        fetchCart();
    };
    

    return (
      <Card
        sx={{
            color: "primary.dark",
            width: "300px",
        }}
      
      
      >
        <div key = {shoe.id} >
            <img style={{
                width: "100%",
                height: "auto",
            }} src={shoe.image}></img>
            <Typography>{shoe.name}, ${shoe.price}</Typography>
            <Button onClick={e => addToCart(shoe)}> click here </Button>
        </div>
     </Card>
    );
}

export default Shoe;