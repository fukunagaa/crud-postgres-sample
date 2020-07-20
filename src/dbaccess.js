const { Client } = require("pg");

// postgresの設定
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "postgres",
});

const selectnameById = async (id) => {
  try {
    await client.connect();
    console.log("Connected successfully in async");
    const result = await client.query("select name from sample_table where id = ($1)", [id]);
    console.log(result.rows);
    await client.end();
    console.log("Client disconnected successfully");
  } catch (err) {
    console.log("Something wrong happend", e);
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
};

selectnameById(1);