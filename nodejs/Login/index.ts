import * as express from "express";
import * as http from "http";
import { resolve } from "path";
import * as querystring from "querystring";
import * as lookup from "./data.json";

const app = express();

app.get("/", (_, res) =>
{
  res.sendFile(resolve(__dirname, "index.html"));
});

app.post("/welcome", (req, res) =>
{
  let data = "";

  req.setEncoding("utf8");
  req.on("data", (blob) => data += blob);
  req.on("end", () =>
  {
    const { username, password } = querystring.parse(data);
    const source = lookup.filter(a => a.username === username && a.password === password)[ 0 ];

    if (source) res.end(`Hello ${source.firstName} ${source.lastName}`);
    else res.end("Username or Password is incorrect");
  });
});

http.createServer(app).listen(8081);
console.log("Server is now running. It is located at localhost:8081 or 127.0.0.1:8081");
