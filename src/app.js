const { Client } = require('pg')

// postgresの設定
const client = new Client ({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "postgres"
})

client.connect()
// 接続を確認
.then(() => console.log("Connected successfuly"))
// users テーブルから取得
.then(() => client.query("select * from sample_table"))
// 結果を返す
.then(results => console.table(results.rows))
// エラーの場合
.catch((e => console.log(e)))
// 終了
.finally((() => client.end()))
