import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store in ARRAY! each object has its own Index
let currentOrders = [
  { // 0 th element of Orders
    id: 1, 
    name: "Joohn dutton",
    email:"john@exaaample.eom",
    address: "musterstrasse 1, 45578 Berlin",
    phone: "885522017",
    date: "2023-08-01T10:00:00Z",
    notes:"dont makaaaaae cold",
    order: "#456",
    editable: false,
  },
  { // 1st element of orders
    id: 2,
    name: "William ii",
    email:"william@examples.com",
    address: "bedstrasse 56, 939378 München",
    phone: "65231s4565",
    date: "2023-08-01T10:00:00Z",
    notes:"Send in 2 days",
    order: "#457",
    editable: false,
  },
  { // 1st element of orders
    id: 3,
    name: "Wiliam iIi",
    email:"william@example.com",
    address: "bendstrasse 56, 939378 München",
    phone: "652414565",
    date: "2023-08-01T10:00:00Z",
    notes:"Send in 21 days",
    order: "#457",
    editable: false,
  },
  { // 1st element of orders
    id: 4,
    name: "Williaam 4",
    email:"william@example.com",
    address: "bendstrasse 56, 939378 München",
    phone: "652314565",
    date: "2023-08-01T10:00:00Z",
    notes:"Send in 1 days",
    order: "#457",
    editable: false,
  },
];

let lastId = currentOrders.length;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all datas
app.get("/orders", (req, res) => { 
  console.log(currentOrders);
  res.json(currentOrders);
});

// GET a specific order by id
app.get("/orders/:id", (req, res) => {
  const numberOfOrder = currentOrders.find((p) => p.id === parseInt(req.params.id)); // it is assiging the number of currentOrders Index
  if (!numberOfOrder) return res.status(404).json({ message: "Post not found" });
  res.json(numberOfOrder); // it is sending found element of currentOrders
});

// POST a new order
app.post("/orders", (req, res) => {
  const newId = ++lastId; // Increment last ID
  const { name, email, phone, street, city, state, zip, notes } = req.body;
  const fullAddress = `${street}, ${zip} ${city}, ${state}`;
  const newOrder = {
    id: newId,
    name,
    email,
    address: fullAddress,
    phone,
    date: new Date().toISOString(), // Automatically setting current date
    notes,
    order: `#${newId + 455}`, // Generate order number dynamically
    editable: false,
  };

  currentOrders.push(newOrder); // Add the new order to the array
  res.status(201).json(newOrder); // Respond with the created order
});

app.put("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const index = currentOrders.findIndex((order) => order.id === orderId);

  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Replace entire object
  currentOrders[index] = {
    id: orderId,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    date: new Date().toISOString(),
    notes: req.body.notes,
    order: `#${orderId + 455}`,
  };

  res.json(currentOrders[index]);
});

app.patch("/toggle/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = currentOrders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const newEditable = order.editable;
  // Update only provided fields
  order.editable = !newEditable; 
  res.json(order);
});


// 📌 PARTIALLY update an order (PATCH)
app.patch("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = currentOrders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Update only provided fields
  if (req.body.name) order.name = req.body.name;
  if (req.body.email) order.email = req.body.email;
  if (req.body.address) order.address = req.body.address;
  if (req.body.phone) order.phone = req.body.phone;
  if (req.body.notes) order.notes = req.body.notes;
  //if (req.body.editable) order.editable = req.body.editable; 
  res.json(order);
});

// 📌 DELETE an order
app.delete("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const index = currentOrders.findIndex((o) => o.id === orderId);

  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Remove from array
  const deletedOrder = currentOrders.splice(index, 1);
  res.json({ message: "Order deleted", deletedOrder });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
