import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import * as querystring from "querystring";
import * as url from "url";

http.createServer((req, res) =>
{
  const { pathname } = url.parse(req.url);

  console.log(`Request for ${pathname} recieved.`);
  fs.readFile(path.resolve(__dirname, pathname.substring(1)), (err, data) =>
  {
    if (err)
    {
      console.error(err);
      res.writeHead(404, { "Content-Type": "text/html" });
    }
    else
    {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data.toString());

      if (req.method === "POST")
      {
        let query = "";

        req.setEncoding("utf8");
        req.on("data", blob =>
        {
          query += blob;
        });
        req.on("end", () =>
        {
          const decoded = querystring.parse(query);

          res.write(`\n<script>data = ${JSON.stringify(decoded)}</script>\n`);
          res.end();
        });
      }
      else
      {
        res.end();
      }
    }
  });
}).listen(8081);
console.log("Server is now running. It is located at localhost:8081 or 127.0.0.1:8081");
