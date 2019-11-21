const knex = require("knex");
const knexConfig = require("../knexfile.js.js");

const dbEnv = process.env.DB_ENV || "development";

console.log("dbConfig: ", dbEnv);

module.exports = knex(knexConfig[dbEnv]);
