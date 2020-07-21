const { Client } = require("pg");
import { serverConfig } from "../../config.js";
// postgresの設定
const option = serverConfig.option.postgres;
let client;
let result;
export default {
  selectEmployeeById: async function (id) {
    try {
      client = new Client(option);
      await client.connect();
      console.log("Connected successfully in async");
      result = await client.query(
        "select * from employee_table where id = $1",
        [id]
      );
      return result.rows;
    } catch (err) {
      console.log("Something wrong happend", err);
    } finally {
      await client.end();
    }
  },
  selectEmployeeALL: async function () {
    try {
      client = new Client(option);
      await client.connect();
      console.log("Connected successfully in async");
      result = await client.query("select * from employee_table").then( (res) => {
        return res;
      });
      return result.rows;
    } catch (err) {
      console.log("Something wrong happend", err);
    } finally {
      await client.end();
    }
  },
  createEmployee: async function (name, age) {
    try {
      client = new Client(option);
      await client.connect();
      console.log("Connected successfully in async");
      result = await client.query(
        "insert into employee_table(name, age) values ($1, $2)",
        [name, age]
      );
      return result.rowCount;
    } catch (err) {
      console.log("Something wrong happend", err);
    } finally {
      await client.end();
    }
  },
  updateEmployee: async function (id, name, age) {
    try {
      client = new Client(option);
      await client.connect();
      console.log("Connected successfully in async");
      result = await client.query(
        "update employee_table set name = $1, age = $2 where id = $3",
        [name, age, id]
      );
      return result.rowCount;
    } catch (err) {
      console.log("Something wrong happend", err);
    } finally {
      await client.end();
    }
  },
  deleteEmployeebyId: async function (id) {
    try {
      client = new Client(option);
      await client.connect();
      console.log("Connected successfully in async");
      result = await client.query(
        "delete from employee_table where id = $1",
        [id]
      );
      return result.rowCount;
    } catch (err) {
      console.log("Something wrong happend", err);
    } finally {
      await client.end();
    }
  },
};
