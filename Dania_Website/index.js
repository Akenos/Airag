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

// app.post("/orders", async (req, res) => {
//   try {
//     // Destructure required fields from the request body
//     const { name, email, phone, street, city, state, zip, notes } = req.body;

//     // Combine the address fields into one address string
//     const fullAddress = `${street}, ${zip} ${city}, ${state}`;

//     // Create the new order object to send to the external API
//     const orderData = {
//       name,
//       email,
//       phone,
//       address: fullAddress, // Store the combined address
//       notes,
//     };

//     // Send the request to the external API
//     const response = await axios.post(`${API_URL}/orders`, orderData);

//     // Log the response from the external API (for debugging)
//     console.log(response.data);

//     // Respond with the data received from the external API
//     res.status(201).json(response.data);
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error(error);
//     res.status(500).json({ message: "Error creating order" });
//   }
// });

// app.post("/orders", async (req, res) => {
//     try {
//       console.log("Received request body:", req.body); // Debugging line
//       // Destructure required fields from the request body
//       //const { name, email, phone, street, city, state, zip, notes } = req.body;
  
//       // Combine the address fields into one address string
//       const fullAddress = `${street}, ${zip} ${city}, ${state}`;
  
//       // Create the new order object to send to the external API
//       const orderData = {
//         name,
//         email,
//         phone,
//         address: fullAddress, // Store the combined address
//         notes,
//       };
//       console.log("Formatted orderData:", orderData); // Debugging line
//       // Send the request to the external API
//       const response = await axios.post(`${API_URL}/orders`, orderData);
  
//       // Log the response from the external API (for debugging)
//       console.log(response.data);
  
//       // Respond with the data received from the external API
//       res.status(201).json(response.data);
//     } catch (error) {
//       // Handle any errors that occur during the request
//       console.error("Error creating order:", error.message);
  
//       // Provide more detailed error information
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         res.status(error.response.status).json({
//           message: "Error from external API",
//           details: error.response.data,
//         });
//       } else if (error.request) {
//         // The request was made but no response was received
//         res.status(500).json({ message: "No response received from external API" });
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         res.status(500).json({ message: "Error setting up the request" });
//       }
//     }
//   });
app


// Route to Submitting order by a Client
app.post("/orders", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
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

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});