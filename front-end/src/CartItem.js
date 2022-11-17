import axios from 'axios';
import { useState, useEffect } from 'react';

function CartItem(props){
    
    const setError = props.setError;
    const item = props.item;
    const fetchCart = props.fetchCart;
    const [shoeName, setProductName] = useState("");
    
    const getProduct = async(cartItem) => {
        try {
            const response = await axios.get("/api/shoes/" + cartItem.id);
            return response.data;
        } catch(error){
            setError("Error getting product with associated item ID: " + error);
        } 
    };

    const saveProduct = async() => {
        await getProduct(item).then(product => {
            setProductName(product.name);
        });
    };
    
    saveProduct();
    
    const addOneItem = async(itemID) => {
        try {
          await axios.post("/api/cart/" + itemID);
        } catch (error) {
          setError("Error adding product to cart: " + error);
        }
      };
      
    const increment = async(itemID) => {
        await addOneItem(itemID);
        fetchCart();
        };
        
    const decrementOneItem = async(item) => {
        try{
            if(item.quantity == 1){
                await remove(item);
            } else {
                await axios.put("/api/cart/" + item.id + "/" + (item.quantity - 1));
            }
        } catch (error) {
            setError("Error decrementing product in cart: " + error);
        }
    };
    
    const decrement = async(item) => {
        await decrementOneItem(item);
        fetchCart();
    };
    
    
    const removeItem = async(item) => {
        await remove(item);
        fetchCart();
    };

    const remove = async(item) => {
        try{
            await axios.delete("/api/cart/" + item.id);
        } catch(error) {
            setError("Error deleting item from cart: " + error);
        }
    };
    
    return (
    <div className = "CartItem">
       <div key = {item.id} >
          <p>{shoeName}, {item.quantity}</p>
          <button onClick={e => increment(item.id)}> + </button>
          <button onClick={e => decrement(item)}> - </button>
          <button onClick={e => removeItem(item)}> Remove from cart </button>
        </div>
    </div>
    );
}

export default CartItem;