import express from 'express';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import axios from "axios";

const __filename = fileURLToPath(import.meta.url); //Gets the current file's URL (like file:///your-project/index.js)
                                                  // and Converts that URL to a normal path string (/your-project/index.js)
const __dirname = dirname(__filename); // Extracts just the directory path (/your-project)

const app = express();
const API_URL = "http://localhost:4000";

// Configure EJS
app.set('view engine', 'ejs'); //Tells Express to use EJS as the template engine for rendering HTML
app.set('views', join(__dirname, 'views'));

// Serve static files
app.use(express.static(join(__dirname, 'public')));
app.use('/vendor', express.static(join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// making posts editable
app.get("/orders/editToggle/:id", async (req, res) => {
  console.log("[MY APP] Called for order:", req.params.id);

  try {
    //const post = await axios.get(`${API_URL}/orders/${req.params.id}`);
    await axios.patch(`${API_URL}/toggle/${req.params.id}`);

    res.redirect("/admin");
  } catch (error) {
    console.error(" [MY APP] Error toggling editable:", error);
    res.status(500).json({ message: "Error toggling editable" });
  }
});

// Partially updating an orden
app.post("/orders/save/:id", async (req, res) => {
  console.log("called");
  try {
  
    const response = await axios.patch(`${API_URL}/orders/${req.params.id}`, req.body);
    await axios.patch(`${API_URL}/toggle/${req.params.id}`);
    console.log(response.data);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).json({ message: "Error updating Order" });
  }
});


// Route to Submitting order by a Client
app.post("/orders", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating an Order" });
  }
});
// Route to render the Admin page
app.get("/admin", async(req, res) => { // when using Axion it is essential to use Async
    try {
        const response = await axios.get(`${API_URL}/orders`); // getting JSON from http://localhost:4000/posts
        console.log(response);          // print JSON DATA retreived from API
        res.render(`orders`, { orders: response.data }); // sending its datas to Index.ejs under Keyword `orders`
      } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
      }
  });

  app.get("/orders/delete/:id", async (req, res) => {
    try {
      await axios.delete(`${API_URL}/orders/${req.params.id}`);
      res.redirect("/admin");
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  });

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});