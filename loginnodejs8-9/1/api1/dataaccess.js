class DataAccess {
  #products = [];
  #user = [];
  constructor() {
    this.#products = [
      { 
        ProductId: "Prd-001",
        ProductName: "Laptop",
        CategoryName: "Electronics",
        Manufacturer: "IBM",
        Description: "Gaming",
        Price: 123000,
      },
      {
        ProductId: "Prd-002",
        ProductName: "Iron",
        CategoryName: "Electrical",
        Manufacturer: "Bajaj",
        Description: "Power Press",
        Price: 3000,
      },
    ];
    this.#user = [
      {
        username : "Hardik",
        password : "hardik"
      },
      {
        username : "dik",
        password : "hardik"
      }
    ];
  }

  getProducts() {
    return this.#products;
  }
  getUserName(userName,Password){
    let user1 = [];
    this.#user.forEach(user =>{
    if(user.username === userName && user.password === Password)
    {
      user1.push(user);
    }
  });
    return user1;
  }
  delete(id){
    // const index = this.#products.findIndex((element, index) => {
    //   if (this.#products.ProductId === id) {
    //     console.log(this.#products.ProductId);
    //     return true;
    //   }
    // })
    var index = this.#products.findIndex(img => img.ProductId === id);
    this.#products.splice(index,1);
    return this.#products;
  }
  getProductsById(id) {
    let product = this.#user.find(p=>p.username === id);  
    return product;
  }
  createProduct(product) {
    this.#products.push(product);
    return this.#products;
  }
  updateProduct(product,id){
    this.#products.forEach(p=>{
      if(p.ProductId == id){
        p.ProductName = product.ProductName;
        p.CategoryName = product.CategoryName;
        p.Manufacturer = product.Manufacturer;
        p.Description = product.Description;
        p.Price = product.Price;
      }
    });  
    let productt = this.getProducts();
    return productt;
  }
}

module.exports = DataAccess;
