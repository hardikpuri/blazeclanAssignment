let uid;
function printData(record){
    var headers= [];
    for(var p in record[0]){
        headers.push(p);
    }
    var headerRow = '';
    for(var i=0;i<headers.length;i++){
        headerRow+="<th>"+headers[i]+"</th>";
    };
    document.getElementById("thead").innerHTML = headerRow;

    document.getElementById("thead")
    var tr = '';
    var flag = 0;
    for(var i=0;i<record.length;i++)
    {   tr+='<tr>';
        flag+=1;
        for(var j=0;j<headers.length;j++)
        {
            tr+='<td>'+ record[i][headers[j]] + '</td>';
        }
        console.log(record[i].ProductId);
        tr+="<td><input type = 'button' value='Update' name='update' id='"+record[i].ProductId+"'><input type = 'button' name='delete' value='Delete' id='"+record[i].ProductId+"'></td></tr>";
    }
    //console.log(flag);
    document.getElementById("tbody").innerHTML= tr;
    if(flag>0){
        var updatebtn = document.getElementsByName('update');
        var deletebtn = document.getElementsByName('delete');
        var id;
        if (updatebtn.length > 0) {
            for (var i = 0; i < updatebtn.length; i++) {
                id = updatebtn[i].id;
                console.log(updatebtn[i]);
                updatebtn[i].addEventListener('click', function(e) {
                    var id= e.target.id;
                    uid = id;
                    console.log(uid);
                    update(id);
                }, false);
            }
        }
        if (deletebtn.length > 0) {
            for (var i = 0; i < deletebtn.length; i++) {
                console.log("inside");
                deletebtn[i].addEventListener('click', function (e) {
                    console.log(e.target.id);
                    var id= e.target.id;
                    console.log(id);
                    deleter(id);
                }, false);
            }
        }
    }
};
function deleter(id){
    var promise = deleteProduct(id);
    promise
    .then((data) => {
    //console.log(`Received Data = ${JSON.parse(data)}`);
    call();
    })
    .catch((err) => {
    console.log(`Error = ${err}`);
    });
};

function update(id){
    var promise = getProductById(id);
    //uid = id;
    promise
        .then((data) => {
        //console.log(`Received Data = ${data.rows}`);
        //console.log(`Received Data = ${data.length}`);
        //data = JSON.parse(data.rows);
        
        data = data.rows;
        console.log(data.ProductName);
        console.log(data.ProductId);
        document.getElementById("pname").value=data.ProductName;
        document.getElementById("pcat").value=data.CategoryName;
        document.getElementById("pmanu").value=data.Manufacture;
        document.getElementById("pprice").value=data.price;
        })
        .catch((err) => {
        console.log(`Error = ${err}`);
        });
};

function call(){
    var promise = getProducts();
    promise
    .then((data) => {
    //console.log(`Received Data = ${JSON.parse(data)}`);
    data = JSON.parse(data.rows);
    console.log(data);
    console.log(`Received Data = ${data[0].ProductName}`);
    printData(data);
    })
    .catch((err) => {
    console.log(`Error = ${err}`);
    });

};

function updateData(){
    console.log(uid);
    var data = {
        "ProductId": uid,
        "ProductName": document.getElementById("pname").value,
        "CategoryName": document.getElementById("pcat").value,
        "Manufacture": document.getElementById("pmanu").value,
        "price": document.getElementById("pprice").value
    };
    console.log(data);
    var promise = updateProduct(data);
    promise
    .then((data) => {
        console.log(`Received Data = ${data}`);
        call();
    })
    .catch((err) => {
        console.log(`Error = ${err}`);
    });
};