const crypto = require("node:crypto");
const express = require("express");
const bodyParser = require("body-parser");
const { getDb } = require("./database");
var mongo = require("mongodb");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// 2 apis

// shoe api
// create
// read - this works
// delete - this is good
// get all shoes -  this is done

// cart api
// add a shoe to cart
// get the shoes in the cart
// remove a shoe from the cart
// clear the cart
// update the quantity of an item in the cart

// API for deleting an item from the cart
app.delete("/api/cart/:id", (req, res) => {
  let shoeArray = cart.filter((item) => item.id == req.params.id);
  if (shoeArray.length == 0) {
    res.status(404).send("Sorry, that item is not in the cart.");
    return;
  }
  let item = shoeArray[0];
  let index = cart.indexOf(item.id);
  cart.splice(index, 1);
  res.sendStatus(200);
});

// API for updating the quantity of an item in the cart
app.put("/api/cart/:id/:quantity", (req, res) => {
  // Get the ID and quantity
  let shoeID = req.params.id;
  let quanity = parseInt(req.params.quantity);
  // Try to find the item in the cart
  let cartItem = cart.find((shoe) => (shoe.id = shoeID));
  if (cartItem == undefined) {
    res.status(404).send("Sorry, but that shoe is not in the cart.");
    return;
  }
  // If the item is in the card, change its quantity
  cartItem.quantity = quanity;
  res.send(cartItem);
  // If the quantity is changed to zero, remove the item from the cart
  if (quanity == 0) {
    let index = cart.indexOf(shoeID);
    cart.splice(index, 1);
  }
});

// API for adding a shoe to the cart
app.post("/api/cart/:styleID", async (req, res) => {
  // Get the shoe ID from the request
  let shoeID = req.params.styleID;

  // make a call to the database to see the current cart
  // if the shoe is already in the cart, update the quantity
  // if the shoe is not in the cart, add it to the cart

  const db = await getDb();
  let cart = await db.collection("cart").find({}).toArray();

  // Check if the shoe is already in the cart
  let cartItem = cart.find((shoeID) => (shoeID = shoeID));
  if (cartItem != undefined) {
    // If the shoe is in the cart, update the quantity
    cartItem.quantity++;
    res.send(cartItem);
    return;
  } else {
    // add a document to the cart collection
    let result = await db.collection("cart").insertOne({
      shoeID: shoeID,
      quantity: 1,
    });
  }

  // res success
  res.sendStatus(200);
});

// API for getting all shoes in cart
app.get("/api/cart", async (req, res) => {
  const db = await getDb();
  const cart = await db.collection("cart").find({}).toArray();
  res.send(cart);
});

// API for getting all products
app.get("/api/shoes", async (req, res) => {
  const db = await getDb();

  // db is a mongo client that has connected to the database

  // get all the shoes from the database

  // get max 10

  const tenShoes = await db.collection("sneakers").find().limit(10).toArray();

  // const shoes = await db.collection("shoes").find().toArray();

  console.log(tenShoes);
  res.send(tenShoes);
});

// API for getting a specific product with an ID
app.get("/api/shoes/:id", async (req, res) => {
  let id = req.params.id;

  const db = await getDb();
  var o_id = new mongo.ObjectId(id);

  // get the shoe that matches the id
  const shoe = await db.collection("shoes").findOne({
    _id: o_id,
  });

  res.send(shoe);
});

const getProducts = (query, limit) => {
  return new Promise((resolve, reject) => {
    sneaks.getProducts(query, limit, function (err, products) {
      if (err) {
        reject(err);
      } else {
        resolve(products);
      }
    });
  });
};

const getProductPrice = (id) => {
  return new Promise((resolve, reject) => {
    sneaks.getProductPrices(id, function (err, price) {
      if (err) {
        reject(err);
      } else {
        resolve(price);
      }
    });
  });
};

app.get("/api/sneaks", async (req, res) => {
  const products = await getProducts("", 1000);

  // post the podocuts to the database

  const db = await getDb();

  // split products into batches of 100

  const batches = [];

  //   return res.send(products[0]);

  for (let i = 0; i < products.length; i += 100) {
    batches.push(products.slice(i, i + 100));
  }

  // for each batch call
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    const promises = [];

    for (let j = 0; j < batch.length; j++) {
      const product = batch[j];
      promises.push(getProductPrice(product.styleID));
    }

    const prices = await Promise.all(promises);

    for (let j = 0; j < batch.length; j++) {
      const product = batch[j];
      product.price = prices[j];
    }

    await db.collection("sneakers").insertMany(batch, (upsert = true));
    console.log("Inserted batch " + i);
  }

  shoes = products;
  res.send(products);
});

app.get("/api/getsneaksdata", async (req, res) => {
  const db = await getDb();

  res.send(result);
});

// wrap the get products in a promise

// API for creating a new shoe
app.post("/api/shoes", (req, res) => {
  // Get random ID for product

  console.log("hello there this is the shoes api");

  let randomId = crypto.randomUUID();
  // Make new produce object based on request body

  let shoe = {
    id: randomId,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  };
  // Put new product in list of products
  shoes.push(shoe);
  // Send response saying we added the new product
  res.send(shoe);
});

// API for deleting a product
app.delete("/api/shoes/:id", (req, res) => {
  // Return an array of all products that have the requested ID
  let shoesArray = shoes.filter((item) => item.id == req.params.id);
  // If array is empty, there are no matching products
  if (shoesArray.length == 0) {
    res.status(404).send("Sorry, that shoe doesn't exist");
    return;
  }
  // There should only be one product that matches with that ID, so remove it
  let product = shoesArray[0];
  // Get the index of the product in the product list
  let index = shoes.indexOf(product.id);
  // Remove that product from the list
  shoes.splice(index, 1);
  // Send a success status code
  res.sendStatus(200);
});

// app.listen(3003, () => console.log("Server listening on port 3003!"));
module.exports = app;
