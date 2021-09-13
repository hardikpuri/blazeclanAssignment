function getData(username) {

    return new Promise((resolve, reject) => {
      let http = new XMLHttpRequest();
      http.onload = function () {
          resolve(JSON.parse(http.response)); 
          console.log(JSON.parse(http.response));
          // resolve the result so that the SUbscriber of the Promise will get the response 
      };
      http.onerror = function (e) {
          reject(e); // rejection for error
      };
      // start making call to external REST API
      http.open(
        "GET",
        `http://localhost:9081/api/verify/${username}`
      );
      console.log("in login js");
      // send the request
      http.send();
    });
  };

function getProducts(){
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();
        http.onload = function () {
            resolve(JSON.parse(http.response)); 
            console.log(JSON.parse(http.response));
            // resolve the result so that the SUbscriber of the Promise will get the response 
        };
        http.onerror = function (e) {
            reject(e); // rejection for error
        };
        // start making call to external REST API
        http.open(
          "GET",
          `http://localhost:9081/api/products`
        );
        console.log("in login js");
        // send the request
        http.send();
      });
  };

  function addData(data){
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();
        http.onload = function () {
            resolve(JSON.parse(http.response)); 
            console.log(JSON.parse(http.response));
            // resolve the result so that the SUbscriber of the Promise will get the response 
        };
        http.onerror = function (e) {
            reject(e); // rejection for error
        };
        
        // start making call to external REST API
        http.open(
          "PUT",
          `http://localhost:9081/api/addProduct`
        );
        http.setRequestHeader("Content-Type", "application/JSON");
        console.log("in login js");
        // send the request
        http.send(JSON.stringify(data));
      });
  };

  function getProductById(id) {

    return new Promise((resolve, reject) => {
      let http = new XMLHttpRequest();
      http.onload = function () {
          resolve(JSON.parse(http.response)); 
          console.log(JSON.parse(http.response));
          // resolve the result so that the SUbscriber of the Promise will get the response 
      };
      http.onerror = function (e) {
          reject(e); // rejection for error
      };
      // start making call to external REST API
      http.open(
        "GET",
        `http://localhost:9081/api/product/${id}`
      );
      console.log("in login js");
      // send the request
      http.send();
    });
  };
  function updateProduct(data){
    return new Promise((resolve, reject) => {
      let http = new XMLHttpRequest();
      http.onload = function () {
          resolve(JSON.parse(http.response)); 
          console.log(JSON.parse(http.response));
          // resolve the result so that the SUbscriber of the Promise will get the response 
      };
      http.onerror = function (e) {
          reject(e); // rejection for error
      };
      
      // start making call to external REST API
      http.open(
        "PUT",
        `http://localhost:9081/api/updateProduct`
      );
      http.setRequestHeader("Content-Type", "application/JSON");
      console.log("in login js");
      // send the request
      http.send(JSON.stringify(data));
    });
  };
  function deleteProduct(id){
    return new Promise((resolve, reject) => {
      let http = new XMLHttpRequest();
      http.onload = function () {
          resolve(JSON.parse(http.response)); 
          console.log(JSON.parse(http.response));
          // resolve the result so that the SUbscriber of the Promise will get the response 
      };
      http.onerror = function (e) {
          reject(e); // rejection for error
      };
      
      // start making call to external REST API
      http.open(
        "DELETE",
        `http://localhost:9081/api/deleteProduct/${id}`
      );
      http.setRequestHeader("Content-Type", "application/JSON");
      console.log("in login js");
      // send the request
      http.send();
    });
  };