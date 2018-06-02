var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var login = require("./login");

http.createServer(function (request, response)
{
  var pathname = url.parse(request.url).pathname.substr(1);
  console.log("Request for " + pathname + " received.");
  fs.readFile(pathname, function (err, data)
  {
    if (err)
    {
      console.log(err);
      response.writeHead(404, { "Content-Type": "text/html" });
    }
    else
    {
      response.writeHead(200, { "Content-Type": "text/html" });
      if (request.method == "POST")
      {
        request.on("data", function (qstr)
        {
          var qobj = qs.parse(qstr.toString());

          if (qobj.source == "login")
            var responseData = login.checkForLogin(qobj);

          if (qobj.source == "register")
            var responseData = login.registerUser(qobj);

          response.write(data.toString());
          response.write("\n<script>data = " + JSON.stringify(responseData) + ";</script>\n");
          response.end();
        });
      }
      else
      {
        response.write(data.toString());
        response.end();
      }
    }
  });
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");
