const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  getUserByName,
  updateUser
};

function getUsers() {
  return db("users").select("*");
}

function getUserById(id) {
  return db("users")
    .where("id", id)
    .first();
}

function getUserByName(name) {
  return db("users")
    .where("name", name)
    .first();
}

function addUser(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then(user => {
      const [id] = user;
      return getUserById(id).first();
    });
}

function updateUser(id, changes) {
  return db("users")
    .where("id", id)
    .update(changes, "*")
    .then(user => {
      return getUserById(id).first();
    });
}

function deleteUser(id) {
  return db("users")
    .where("id", id)
    .del();
}
