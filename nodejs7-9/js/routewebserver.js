const http = require("http");
const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "./../views");
const serverPath = path.join(__dirname, "./../views");
const fi = [];
fs.readdir(dirPath, (err, files) => {
  if (err) {
    return;
  }
  // itarate over files
  files.forEach((file, i) => {
    // check if the file is a  'file object' or a 'directory object'
    // the 'stat()' method is used to check the status of the file
    // Is it exist or is it a file or directory
    fs.stat(`${dirPath}/${file}`, (err, stat) => {
      if (err) {
        console.log(`Some Error ${err.message}`);
        return;
      }
      if(stat.isFile()) {
          console.log(file);
          file = `/${file}`;
          fi.push(file);
          console.log(fi);
      }
    });
  });
});

const server = http.createServer((req, resp) => {
  req.url=`${req.url}.html`;
  for(let i=0;i<fi.length;i++){
    if(req.url === fi[i]){
      fs.readFile(
        `${serverPath}${fi[i]}`,
        { encoding: "ascii" },
        (error, file) => {
          if (error) {
            resp.writeHead(404, { "Content-Type": "text/html" });
            resp.write(`File Npot Founf ${error.message}`);
            resp.end();
          }
          resp.writeHead(200, { "Content-Type": "text/html" });
          resp.write(file);
          resp.end();
        }
      );
    }
  }
});

server.listen(9080);
console.log("Started on 9080");
