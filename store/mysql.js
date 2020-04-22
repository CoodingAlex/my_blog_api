const mysql = require("mysql");
const config = require("../config");

const dbconf = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error("[DB ERROR]", err);
      setTimeout(handleCon, 2000);
    }
    {
      console.log("Db Connected");
    }

    connection.on("error", (err) => {
      console.error("[DB ERROR]", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleCon();
      } else {
        throw err;
      }
    });
  });
}

handleCon();

function listWithLimit(table, start, limit) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} limit ${start},${limit}`,
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} `, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
function get(table, param) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE ?`,
      [param],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
}

function query(q) {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  list,
  insert,

  get,
  query,
  listWithLimit,
};
