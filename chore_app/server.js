const express = require("express");
const app = express();
const port = 3000;

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//ROUTES

app.get("/", (req, res) => {
  res.send("chore app");
});
//LISTENER
app.listen(port, () => {
  console.log("listening to" + port);
});
