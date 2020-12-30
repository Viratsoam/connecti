const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");

// use static file
app.use(express.static("./assets"));
// use layout / set Style and script
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// setup the view engine
app.set("views", "./views");
app.set("view engine", "ejs");

//use routes
app.use("/", require("./routes/index"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server:${err}`);
    return;
  }
  console.log(`Server is running on PORT:${port}`);
});
