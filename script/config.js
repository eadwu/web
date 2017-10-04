/**
 * Based on Atom's config.js
 * https://raw.githubusercontent.com/atom/atom/master/script/config.js
 */
const fs = require("fs");
const path = require("path");

const repositoryRootPath = path.resolve(__dirname, "..");
const scriptRootPath = path.join(repositoryRootPath, "script");
const homeDirPath = process.env.HOME || process.env.USERPROFILE;

const appMetadata = require(path.join(repositoryRootPath, "package.json"));

function getNpmBinPath ()
{
  const npmBinName = process.platform === "win32" ? "npm.cmd" : "npm";
  const localNpmBinPath = path.resolve(repositoryRootPath, "script", "node_modules", ".bin", npmBinName);
  return fs.existsSync(localNpmBinPath) ? localNpmBinPath : npmBinName;
}

module.exports = {
  appMetadata,
  repositoryRootPath,
  scriptRootPath,
  homeDirPath,
  getNpmBinPath
};
