import * as fs from "fs";
import { createServer } from "http";
import { resolve } from "path";
import * as querystring from "querystring";
import * as url from "url";
import * as lookup from "./data.json";

const routes = {
  "/": (_, res) =>
  {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(resolve(__dirname, "index.html"), { encoding: "utf8" }, (err, data) =>
    {
      if (err) console.error(err);
      res.end(data);
    });
  },
  "/welcome": (req, res) =>
  {
    let data = "";

    req.setEncoding("utf8");
    res.writeHead(200, { "Content-Type": "text/plain" });
    req.on("data", (blob) => data += blob);
    req.on("end", () =>
    {
      const { username, password } = querystring.parse(data);
      const source = lookup.filter(a => a.username === username && a.password === password)[ 0 ];

      if (source) res.end(`Hello ${source.firstName} ${source.lastName}`);
      else res.end("Username or Password is incorrect");
    });
  }
};

createServer((req, res) =>
{
  const { pathname } = url.parse(req.url);

  if (!routes[ pathname ])
  {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  } else routes[ pathname ](req, res);
}).listen(8081);
console.log("Server is now running. It is located at localhost:8081 or 127.0.0.1:8081");
