const crypto = require("node:crypto");
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); 

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

let shoes = [];
let cart = [];

// API for deleting an item from the cart
app.delete("/api/cart/:id", (req, res) => {
    let shoeArray = cart.filter(item => item.id == req.params.id);
    if (shoeArray.length == 0){
        res.status(404).send("Sorry, that item is not in the cart.");
        return;
    }
    let item = shoeArray[0];
    let index = cart.indexOf(item.id);
    cart.splice(index, 1);
    res.sendStatus(200);
});

// API for updating the quantity of an item in the cart
app.put("/api/cart/:id/:quantity", (req, res) =>{
   // Get the ID and quantity
   let shoeID = req.params.id;
   let quanity = parseInt(req.params.quantity);
   // Try to find the item in the cart
   let cartItem = cart.find(shoe => shoe.id = shoeID);
   if (cartItem == undefined){
       res.status(404).send("Sorry, but that shoe is not in the cart.");
       return;
   }
   // If the item is in the card, change its quantity
   cartItem.quantity = quanity;
   res.send(cartItem);
   // If the quantity is changed to zero, remove the item from the cart
   if(quanity == 0){
        let index = cart.indexOf(shoeID);
        cart.splice(index, 1);
   }
});

// API for adding a shoe to the cart
app.post("/api/cart/:id", (req, res) => {
   // Get the product ID from the request
   let shoeID = req.params.id;
   // Get the product from the list of products
   let shoe = shoes.find(item => item.id == shoeID);
   // Check if the product exists
   if (shoe == undefined){
       res.status(404).send("Sorry, that shoe doesn't exist or you have" + 
       "the wrong id.");
       return;
   }
   // Determine if the product is already in the cart
   let cartItem = cart.find(shoe => shoe.id == shoeID);
   // If not in cart, cartItem will be udnefinded
   if(cartItem == undefined){
       // Add a new cartItem object into cart array
       cartItem = {
         id: shoeID, 
         quantity: 1
       };
       // Add item to cart 
       cart.push(cartItem);
       
       res.send(cartItem);
   } else {
        // If item is in cart, just increment the number
        cartItem.quantity += 1; 
        res.send(cartItem);
   }
});

// API for getting all shoes in cart
app.get("/api/cart", (req, res) => {
    
    res.send(cart); 
});