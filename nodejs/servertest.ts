import * as http from "http";

http.createServer((request, response) =>
{
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
}).listen(8081);

console.log("Server is running in 127.0.0.1:8081");
