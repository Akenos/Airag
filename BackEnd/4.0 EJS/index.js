import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
const today = new Date();
const day = today.getDay(); 

let type = "a weekday";
let adv = " Its time to work hard";

if(day === 0 || day === 6){
    type = " the weekend";
    adv = " its is time to have FUn";
}

 res.render("index.ejs",{ 
    dayType: type,
    advice: adv,
 });
});

app.listen(port, () => {

    console.log(`Server Running on port ${port}.`);
    
});