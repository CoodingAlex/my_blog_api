const express = require("express");
const Router = express.Router();
const controller = require("./index");
const responses = require("../../network/responses");
Router.get("/", getPosts);
Router.get("/:page", getPostPage);
Router.get("/post/:id", getPostById);

function getPosts(req, res, next) {
  controller
    .listPosts()
    .then((posts) => {
      responses.Success(req, res, 200, posts);
    })
    .catch(next);
}
function getPostPage(req, res, next) {
  controller
    .listPostByPage(req.params.page)
    .then((posts) => {
      responses.Success(req, res, 200, posts);
    })
    .catch(next);
}

function getPostById(req, res, next) {
  controller
    .getPostById(req.params.id)
    .then((post) => {
      responses.Success(req, res, 200, post);
    })
    .catch(next);
}

module.exports = Router;
