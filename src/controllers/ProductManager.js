import {promises as fs} from 'fs'

class Product {
    constructor(title, description, code, price, status, stock, category, thumbnail,id) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = true;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
        this.id = id;
    }
}

export default class ProductManager extends Product {
    constructor() {
        super();
        this.path = './src/models/products.json' // Archivo json
        this.products = []; //Array vacio de productos
    }

    
    readProducts = async () =>{
        try{
            const products = await fs.readFile(this.path, "utf-8")
            return JSON.parse(products)
        }catch{
            return[]
        }
        
    }
    
    writeProducts = async (prod) => {
        await fs.writeFile(this.path,JSON.stringify(prod));
    }

    existCode = async (code) =>{
        const prods = await this.readProducts();
        return prods.some(product => product.code === code )
    }

    existProd = async (id) => {
        const prods = await this.readProducts();
        return prods.find(prod => prod.id === id)
    }

    addProducts = async (prod) => {
        const prodsOld = await this.readProducts()
        if(!prod.title || !prod.description || !prod.price || !prod.code ||!prod.stock || !prod.category || !prod.status){
            console.log('The arguments are not defined')
        }else if(await this.existCode(prod.code)){
            console.log("The product already exists")
        }else{
            this.products.push(...prodsOld,prod)
            console.log(this.products)
            const newProduct = new Product(prod.title,prod.description,prod.code,prod.price,prod.status,prod.stock,prod.category,prod.thumbnail,prod.id)
            const prodAll = [...prodsOld, newProduct];
            await this.writeProducts(prodAll);
            return "Product added"
        }
        
    }

    getProducts = async () => { // Metodo para mostrar los productos del archivo json
        const res = await this.readProducts()
        console.log(res)
    }

    

    getProductById = async (id) =>{ // Metodo para mostrar un producto por su id
        const prodId = await this.existProd(id);
        console.log(prodId);
        if(!prodId) return "Not found"
        return prodId;
    }

    delateProductsById = async (id) =>{ // Metodo para eliminar por el id
        const  prods = await this.readProducts() 
        const existProd = prods.some(prod => prod.id !== id)
        if(existProd){
            const filterProd = prods.filter(prod => prod.id != id)
            await this.writeProducts(filterProd);
            return "product removed"
        }
        return "Not found"
    }

    updateProducts = async (id, product) => { // Metodo para modificar
        const prodById = await this.existProd(id);
        if(!prodById) return "Not found"
        await this.delateProductsById(id)
        const prodsOld = await this.readProducts();
        const updateProduct = [ ... prodsOld,{...product , id : id}]
        await this.writeProducts(updateProduct);
        return "Updated product"
    }
} 




// const product = new ProductManager(); // Creamos una instancia de ProductManager


// product.addProducts({"title":"Laptop","description":"Laptop msi ...","code":"tec1234","price":"1500","status": "true", "stock": "100","category": "Tecnologia","thumbnail":"url/fasdfasdf"});


// product.getProductById(1);

