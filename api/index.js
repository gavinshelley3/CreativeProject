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

app.get("/api/hello", async (req, res) => {
  res.send("Hello World!");
});

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
app.delete("/api/cart/:styleID", async (req, res) => {
  // Get the shoe ID from the request
  let styleID = req.params.styleID;
  const db = await getDb();
  let cart = await db.collection("cart").find({}).toArray();
  let cartItem = cart.find((item) => item.shoeID == styleID);
  if (cartItem != undefined) {
    // If the shoe is in the cart, delete it
    await db.collection("cart").deleteOne({ _id: cartItem._id });
    res.send("Deleted item from cart");
  } else {
    // If the shoe is not in the cart, send an error
    res.status(404).send("Sorry, that item is not in the cart.");
    return;
  }
});

// API for updating the quantity of an item in the cart
app.put("/api/cart/:styleID/:quantity", async (req, res) => {
  // Get the ID and quantity
  let styleID = req.params.styleID;
  const db = await getDb();
  let cart = await db.collection("cart").find({}).toArray();
  let cartItem = cart.find((item) => item.shoeID == styleID);
  let quanityNew = parseInt(req.params.quantity);
  // Try to find the item in the cart
  if (cartItem == undefined) {
    res.status(404).send("Sorry, but that shoe is not in the cart.");
    return;
  }
  // If the item is in the card, change its quantity

  await db
    .collection("cart")
    .updateOne({ shoeID: styleID }, { $set: { quantity: quanityNew } });
  // cartItem.quantity = quanity;
  res.send(cartItem);
  // If the quantity is changed to zero, remove the item from the cart
  if (cartItem.quantity == 0) {
    let index = cart.indexOf(styleID);
    cart.splice(index, 1);
  }
});

// API for adding a shoe to the cart
app.post("/api/cart/:styleID", async (req, res) => {
  // Get the shoe ID from the request
  let styleID = req.params.styleID;

  // make a call to the database to see the current cart
  // if the shoe is already in the cart, update the quantity
  // if the shoe is not in the cart, add it to the cart

  const db = await getDb();
  let cart = await db.collection("cart").find({}).toArray();
  console.log("Cart: ", cart);

  // Check if the shoe is already in the cart
  let cartItem = cart.find((item) => item.shoeID == styleID);
  console.log("CartItem: ", cartItem);
  if (cartItem != undefined) {
    // If the shoe is in the cart, update the quantity
    console.log("Updating quantity");
    await db
      .collection("cart")
      .updateOne(
        { shoeID: styleID },
        { $set: { quantity: cartItem.quantity + 1 } }
      );
    res.send(cartItem);
    return;
  } else {
    // add a document to the cart collection
    console.log("Adding to cart");
    let result = await db.collection("cart").insertOne({
      shoeID: styleID,
      quantity: 1,
    });
    console.log("Result: ", result);
  }

  // res success
  res.sendStatus(200);
});

// API for getting all shoes in cart
app.get("/api/cart", async (req, res) => {
  const db = await getDb();
  const cart = await db.collection("cart").find({}).toArray();
  if (cart.length == 0) {
    res.send([]);
    return;
  } else {
    res.send(cart);
  }
});

//API for getting one shoe in cart
app.get("/api/cart/:styleID", async (req, res) => {
  // Get the shoe ID from the request
  let styleID = req.params.styleID;
  const db = await getDb();
  let cart = await db.collection("cart").find({}).toArray();
  let cartItem = cart.find((item) => item.shoeID == styleID);
  if (cartItem != undefined) {
    // If the shoe is in the cart, find it in the database and send it
    let sneakers = await db
      .collection("sneakers")
      .findOne({ styleID: styleID });
    res.send(sneakers);
  } else {
    res.status(404).send("Sorry, that shoe is not in the cart.");
  }
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
app.get("/api/shoes/:styleID", async (req, res) => {
  // create a connection to the database
  const db = await getDb();
  // get the shoe that matches the styleID
  const shoe = await db.collection("sneakers").findOne({
    styleID: req.params.styleID,
  });
  // send the shoe back to the client

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

  // post the products to the database

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
app.post("/api/shoes", (req, res) => {});

// API for deleting a product
app.delete("/api/shoes/:styleID", (req, res) => {
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
