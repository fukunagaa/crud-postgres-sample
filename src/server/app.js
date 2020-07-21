const http = require("http");
const fs = require("fs");
const url = require("url");
import { serverConfig } from "../../config.js";
import dbaccess from "./dbaccess";

const mine = serverConfig.mine;

async function setResponseFile(res, contextType, filePath, encoding) {
  res.writeHead(200, { "Content-Type": contextType });
  res.write(fs.readFileSync(filePath, encoding));
  res.end();
  console.info("fileレスポンスを返しました。処理を終了させます。");
}

async function setResponseText(res, contextType, resData, encoding) {
  res.writeHead(200, { "Content-Type": contextType });
  res.write(resData, encoding);
  res.end();
  console.info("textレスポンスを返しました。処理を終了させます。");
}

const server = http.createServer(async (req, res) => {
  console.log("---------- server start ----------");
  req.setEncoding("utf8");
  //splitで . で区切られた配列にする
  let tmp = req.url.split(".");
  //tmp配列の最後の要素(外部ファイルの拡張子)を取得
  let ext = tmp[tmp.length - 1];
  //リクエストされたURLをサーバの相対パスへ変換する
  let path = "." + req.url;
  let pathname = url.parse(req.url).pathname;
  //リクエストされたクエリパラメータを取得
  let query = url.parse(req.url, true).query;
  let isResponse = true;
  let filePath = path;
  let contextType = mine[ext];
  let encoding;
  console.log("pathname: " + pathname);
  switch ((mine.key = ext)) {
    case "html":
    case "js":
    case "css":
      encoding = "utf-8";
      break;
    case "jpg":
    case "jpeg":
    case "png":
      encoding = "binary";
      break;
    case "ico":
      isResponse = false;
      break;
    default:
      encoding = "utf-8";
      contextType = "text/html";
      // GET REQUEST
      if (req.method === "GET") {
        isResponse = false;
        filePath = "./src/html/index.html";
        console.log("GET PATH: " + path);
        console.log("↓query↓");
        console.log(query);
        switch (pathname) {
          case "/":
            setResponseFile(res, contextType, filePath, encoding);
            break;
          default:
            //エラーページ
            filePath = "./src/html/error.html";
            setResponseFile(res, contextType, filePath, encoding);
            break;
        }
      }
      // POST REQUEST
      else if (req.method === "POST") {
        isResponse = false;
        filePath = "./src/html/index.html";
        console.log("POST PATH: " + path);
        let postJson;
        let query;
        let name;
        let age;
        let id;
        let result;
        // data受信イベントの発生時に断片データ(chunk)を取得
        req
          .on("data", (chunk) => {
            // JSON形式
            console.log("on data");
            postJson = chunk;
          })
          .on("end", async () => {
            isResponse = true;
            switch (pathname) {
              case "/":
                setResponseFile(res, contextType, filePath, encoding);
                break;
              case "/create":
                console.log("create");
                console.log(postJson);
                query = new URLSearchParams(postJson);
                name = query.get("name");
                age = query.get("age");
                result = await dbaccess
                  .createEmployee(name, age)
                  .then((res) => {
                    console.log(res);
                    return res;
                  });
                console.log(result);
                setResponseFile(res, contextType, filePath, encoding);
                break;
              case "/delete":
                console.log("delete");
                console.log(postJson);
                query = new URLSearchParams(postJson);
                console.log(query);
                id = query.get("id");
                result = await dbaccess.deleteEmployeebyId(id).then((res) => {
                  return res;
                });
                console.log(result);
                setResponseFile(res, contextType, filePath, encoding);
                break;
              case "/update":
                console.log("update");
                query = new URLSearchParams(postJson);
                name = query.get("name");
                age = query.get("age");
                id = query.get("id");
                result = await dbaccess
                  .updateEmployee(id, name, age)
                  .then((res) => {
                    return res;
                  });
                console.log(result);
                setResponseFile(res, contextType, filePath, encoding);
                break;
              case "/select":
                console.log("select");
                console.log(postJson);
                query = new URLSearchParams(postJson);
                id = query.get("id");
                // ID指定なしで全権取得
                if (id == "") {
                  result = await dbaccess.selectEmployeeALL().then((res) => {
                    return res;
                  });
                // ID指定ありで1件取得
                } else {
                  result = await dbaccess.selectEmployeeById(id).then((res) => {
                    return res;
                  })
                }
                console.log(JSON.stringify(result));
                setResponseText(res, contextType, JSON.stringify(result), encoding);
                break;
              default:
                // エラーページ
                filePath = "./src/html/error.html";
                setResponseFile(res, contextType, filePath, encoding);
                break;
            }
            return 0;
          });
      }
      break;
  }

  if (isResponse == true) {
    console.log("filePath:" + filePath);
    console.log("ext:" + ext);
    console.log("mine[ext]:" + contextType);
    setResponseFile(res, contextType, filePath, encoding);
  }
});

server.listen(serverConfig.port, () => {
  console.info(
    `Listening on ${serverConfig.port} :: http://localhost:${serverConfig.port}/`
  );
});
