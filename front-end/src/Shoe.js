import axios from 'axios';

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
      <div className = "Shoe">
        <div key = {shoe.id} >
            <img src = "${shoe.image}"></img>
            <p>{shoe.name}, {shoe.price}</p>
            <button onClick={e => addToCart(shoe)}> Add to cart </button>
        </div>
     </div>
    );
}

export default Shoe;