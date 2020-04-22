//config
const config = require("../config");
//express
const express = require("express");
const App = express();
const ErroHandler = require("./network/middlewares/ErrorHandler");
const cors = require("cors");
//Routes files
const posts = require("./components/posts/network");
//middlewares
App.use(express.json());

App.use(cors());

// Then use it before your routes are set up:
//routes
App.use("/posts", posts);

//error middlewares
App.use(ErroHandler);

App.listen(config.api.port, () => {
  console.log(`Api listening on port ${config.api.port}`);
});
