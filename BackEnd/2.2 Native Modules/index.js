const fs = require("fs");

fs.writeFile("message.txt", "See you AGAIN NODE.js", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});


fs.readFile('message.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  })
