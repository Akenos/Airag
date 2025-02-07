import express from "express"; // importing the Library
const app = express(); // Creating a object
const port = 3000; // decalring variable

// Get method of Express allows user to request resource from the server by Res it sends this
app.get("/", (req, res) => {
    // console.log(req.rawHeaders);
    res.send("<h1>Hello</h1>");
});

app.get("/About", (req, res) => {
    // console.log(req.rawHeaders);
    res.send("<h1>THIS IS ABOUT </h1><p>sdamkdlsamdasd</p>");
});

app.get("/contact", (req, res) => {
    // console.log(req.rawHeaders);
    res.send("<h1>CONTACT ME!</h1>");
});


// created a port
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});