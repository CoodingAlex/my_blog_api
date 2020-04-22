const TABLE = "posts";
module.exports = (injectedStore) => {
  let store;
  if (injectedStore) {
    store = injectedStore;
  } else {
    throw new Error("No store");
  }

  async function listPosts() {
    return store.list(TABLE);
  }
  async function listPostByPage(page) {
    //the url is going to be like http://api/posts?page={page => this is a string}
    let limitPosts = parseInt(page);
    limitPosts = limitPosts * 10;
    return store.listWithLimit(TABLE, limitPosts, 10);
  }

  async function getPostById(id) {
    return store.get(TABLE, { post_id: id });
  }

  return {
    listPosts,
    listPostByPage,
    getPostById,
  };
};
