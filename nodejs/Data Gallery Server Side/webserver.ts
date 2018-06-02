var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function (request, response)
{
  var pathname = url.parse(request.url).pathname.substring(1);
  console.log("Request for " + pathname + " received.");
  fs.readFile(pathname, function (err, data)
  {
    var contentType = pathname.substring(pathname.indexOf(".") + 1);
    if (contentType == "png" || contentType == "jpg")
      contentType = "image/" + contentType;
    else
      contentType = "text/" + contentType;

    console.log("File type is " + contentType);

    if (err)
    {
      console.log(err);
      response.writeHead(404, { "Content-Type": contentType });
    }
    else
    {
      response.writeHead(200, { "Content-Type": contentType });

      if (contentType.indexOf("image") >= 0)
      {
        response.write(data, "binary");
      }
      else
      {
        response.write(data.toString());
        if (pathname == "index.html")
        {
          responseData = fs.readFileSync("itemdata.txt");
          response.write("\n<script>data = [" + responseData + "];</script>");
        }
      }
    }
    response.end();
  });
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");
