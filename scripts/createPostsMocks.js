const postsMock = require("../utils/mocks/fakePosts");
const store = require("../store/mysql");
const { nanoid } = require("nanoid");
function createPostMocks() {
  postsMock.forEach((post) => {
    let fullPost = {
      ...post,
      post_id: nanoid(),
    };
    delete fullPost.id;
    store.insert("posts", fullPost);
  });
}

createPostMocks();
