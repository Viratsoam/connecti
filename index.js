const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//use routes
app.use("/", require("./routes/index"));

// setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server:${err}`);
    return;
  }
  console.log(`Server is running on PORT:${port}`);
});
