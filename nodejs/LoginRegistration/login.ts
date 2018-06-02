var fs = require("fs");

exports.checkForLogin = function (loginInfo)
{
  var loginData = fs.readFileSync("dbase.txt");
  loginData = loginData.toString().split(";");
  for (var i = 0; i < loginData.length; i++)
  {
    var dataObj = JSON.parse(loginData[ i ]);

    if (dataObj.uname == loginInfo.uname && dataObj.pword == loginInfo.pword)
      return dataObj;
  }
}

exports.registerUser = function (user)
{
  var responseData = {};
  var userData = require("./login").checkForLogin(user);
  if (userData)
  {
    responseData.msg = "Username already exists.";
  }
  else
  {
    fs.appendFile("dbase.txt", ";" + JSON.stringify(user), function (err)
    {
      if (err)
        throw err;
      console.log("File updated.");
    });

    responseData.msg = "Thank you for signing up.";
  }

  return responseData;
}
