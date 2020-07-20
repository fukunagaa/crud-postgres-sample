const { Client } = require("pg");
import { serverConfig } from "../../config.js";
// postgresの設定
const option = serverConfig.option.postgres;

export default {
  selectnameById: async function (id) {
    try {
      const client = new Client(option);
      await client.connect();
      console.log("Connected successfully in async");
      const result = await client.query(
        "select name from sample_table where id = ($1)",
        [id]
      );
      return result.rows;
    } catch (err) {
      console.log("Something wrong happend", e);
    } finally {
      await client.end();
    }
  },
  createEmployee: async function (name, age) {
    // postgresの設定
    try {
      const client = new Client(option);
      await client.connect();
      console.log("Connected successfully in async");
      const result = await client.query(
        "insert into employee_table(name, age) values ($1, $2)",
        [name, age]
      );
      return result.rows;
    } catch (err) {
      console.log("Something wrong happend", e);
    } finally {
      await client.end();
    }
  },
};
