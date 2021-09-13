const http = require("http");
const fs = require("fs");
const path = require("path");
const products = [
    { pno: 1, ProductName: "A", Price: 3100 },
    { pno: 2, ProductName: "B", Price: 3100 },
    { pno: 3, ProductName: "C", Price: 3100 },
    { pno: 4, ProductName: "D", Price: 3100 },
    { pno: 5, ProductName: "E", Price: 3100 },
    { pno: 6, ProductName: "F", Price: 3100 },
    { pno: 7, ProductName: "I", Price: 3100 }
  ];
const serverPath = path.join(__dirname, "./../views");
const server = http.createServer((request,response)=>{
    if(request.url == "/home"){
        fs.readFile(`${serverPath}/home.html`,{ encoding: "ascii" },(error, file) => {
            if (error) {
                response.writeHead(404, { "Content-Type": "text/html" });
                response.write(`File Npot Founf ${error.message}`);
                response.end();
                }
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(file);
                response.end();
            }
        );
    }else{
        if(request.method === "GET"){
            let id= request.headers.pno;
            console.log(typeof(request.headers.Authorization));
        if(id === undefined){
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(products));
            response.end();
        }else {
            response.writeHead(200, {'Content-Type': 'application/json'});
            let res =  products.filter((e,i)=> {return e.pno === parseInt(id);});
            console.log(`Data in Else ${JSON.stringify(res)}`)
            response.write(JSON.stringify(res));
            response.end();
        }
    }
    if(request.method === "PUT"){
        let receivedData;
        request.on('data', (chunk)=>{
            receivedData = JSON.parse(chunk);
        });
        request.on('end', ()=>{
            console.log(receivedData)
            let res =  products.filter((e,i)=> {return e.pno === parseInt(receivedData.pno);});
            console.log(products);
            console.log(res);
            if(res.length > 0){
                response.writeHead(500, { "Content-Type": "application/txt" });
                response.write(JSON.stringify("Alrready Present"));
                response.end();
            }else{
                products.push(receivedData);
                response.end(JSON.stringify(products));
            }
        });
    }
    if(request.method === "DELETE"){
        let id= request.headers.pno;
        if(id === undefined){
            response.writeHead(200, { "Content-Type": "application/txt" });
            response.write(JSON.stringify("Id undefined"));
            response.end();
        }else {
            response.writeHead(200, {'Content-Type': 'application/json'});
            const index = products.findIndex(x => x.pno === parseInt(id));
            if (index !== undefined) products.splice(index, 1);
            response.write(JSON.stringify(products));
            response.end();
        }
    }
    if(request.method === "POST"){
        let receivedData;
        request.on('data', (chunk)=>{
            receivedData = JSON.parse(chunk);
        });
        request.on('end', ()=>{
            const index = products.findIndex(x => x.pno === parseInt(receivedData.pno));
            console.log(index);
            if(index == -1){
                response.writeHead(200, { "Content-Type": "application/txt" });
                response.write(JSON.stringify("Not Present"));
                response.end();
            }else{
                products[index].ProductName = receivedData.ProductName;
                products[index].Price = receivedData.Price;
                response.end(JSON.stringify(products));
            }
            
        });
    }
    }
});
server.listen(9080);
console.log("STarted listening on port 9080");
