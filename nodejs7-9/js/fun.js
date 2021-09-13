function load(){
    document.getElementById("btn").addEventListener("click", function(){
        let http = new XMLHttpRequest();
        http.open(
            "GET",
            "http://localhost:9080"
        );
        //http.setRequestHeader("pno", 1);
        console.log("in click");
        http.onload =function(){
            products = http.response;
            console.log(`Received the Response ${http.response}`);
            document.getElementById("res").innerText = products;
        }
        http.onerror =function(e){
            console.log(`Error Occred ${e}`);
        }
        http.send();
    },false);
    document.getElementById("submit").addEventListener("click",upload,false);
};

function upload(){
    console.log("in upload");
    let data = {
        "pno" : document.getElementById("pno").value,
        "ProductName" : document.getElementById("Pname").value,
        "Price" : document.getElementById("price").value
    }
    console.log(typeof(data));
    let http = new XMLHttpRequest();
    http.open(
        "PUT",
        "http://localhost:9080"
    );
    http.setRequestHeader("Content-Type", "application/JSON");
    console.log("in click");
    http.onload =function(){
        products = http.response;
        console.log(`Received the Response ${http.response}`);
        document.getElementById("res").innerText = products;
    }
    http.onerror =function(e){
        console.log(`Error Occred ${e}`);
    }
    http.send(JSON.stringify(data));
};