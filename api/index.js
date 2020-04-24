//config
const config = require("../config");
const serverless = require("serverless-http");
//express
const express = require("express");
const App = express();
const ErroHandler = require("./network/middlewares/ErrorHandler");
const cors = require("cors");
//Routes files
const Router = express.Router();

const posts = require("./components/posts/network");
//middlewares
App.use(express.json());
App.use(cors());

// Then use it before your routes are set up:
//routes

Router.use("/posts", posts);
App.use("/", Router); // path must route to lambda
//error middlewares
App.use(ErroHandler);

App.listen(config.api.port, () => {
  console.log(`Api listening on port ${config.api.port}`);
});
