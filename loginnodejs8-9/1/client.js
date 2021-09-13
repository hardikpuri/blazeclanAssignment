const serviceClient = require('./callexternalservice');

const clientObject = new serviceClient(); 
//the 'http' is the default value for the protocol
    // const options = {
    // host: 'localhost',
    // port : '9081',
    // path: '/api/products',
    // method: 'GET',
    // headers:{
    //          'authorization': 'Basic Hardik:hardik'
    // }
    // };
    // // make call to the method of the module
    // clientObject.getData(options).then((data)=>{
    // console.log(`Received Data ${data}`);
    // }).catch((error)=>{
    // console.log(`Communication Error ${error}`);
    // });


    // let data = {
    //     "ProductRowId":90,
    //     "ProductId":"123",
    //     "ProductName":"Hardik",
    //     "Manufacturer":"s",
    //     "CategoryName":"e",
    //     "Description":"s",
    //     "BasePrice":20000
    // };
    // const options = {
    //     host: 'localhost',
    //     port:'9081',
    //     path: '/api/products',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //          'authorization': 'Basic Hardik:hardik'
    //     },
    // };
    // // make call to the method of the module
    // clientObject.putData(options,data).then((data)=>{
    //     console.log(`Receivd Data ${data}`);
    // }).catch((error)=>{
    //     console.log(`Communication Error ${error}`);
    // });

    // let data = {
    //         ProductId: "Prd-001",
    //         ProductName: "Laptop",
    //         CategoryName: "Electronics",
    //         Manufacturer: "IBM",
    //         Description: "Gaming",
    //         Price: 123,
    // };
    // const options = {
    //     host: 'localhost',
    //     port:'9081',
    //     path: '/api/products/Prd-001',
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //          'authorization': 'Basic Hardik:hardik'
    //     },
    // };
    // // make call to the method of the module
    // clientObject.updateData(options,data).then((data)=>{
    //     console.log(`Receivd Data ${data}`);
    // }).catch((error)=>{
    //     console.log(`Communication Error ${error}`);
    // });

    
    const options = {
        host: 'localhost',
        port:'9081',
        path: '/api/products/Prd-002',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic Hardik:hardik'
        },
    };
    // make call to the method of the module
    clientObject.deleteData(options).then((data)=>{
        console.log(`Receivd Data ${data}`);
    }).catch((error)=>{
        console.log(`Communication Error ${error}`);
    });