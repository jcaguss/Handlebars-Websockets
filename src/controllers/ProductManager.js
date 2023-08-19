import {promises as fs} from 'fs'

export default class ProductManager {

    constructor() {
        this.path = './src/models/productos.json' // Archivo json
        this.products = []; //Array vacio de productos
    }

    writeProducts = async (prod) =>{ 
        await fs.writeFile(this.path, JSON.stringify(prod))
    }

    readProducts = async () => { // Metodo para leer todos los Productos
        try{
            const prods = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(prods);
        }
        catch{
            return [];
            console.log("error")
        }
            
    }

    addProducts = async (product) => { // Metodo para añadir productos
        this.products.push(new Product(product))
        const productOld = await this.readProducts();
        const productAll = [...productOld,product];
        await this.writeProducts(productAll)
    }
    

    getProducts = async () => { // Metodo para mostrar los productos del archivo json
        const res = await this.readProducts()
        console.log(res)
    }

    getProductById = async (id) =>{ // Metodo para mostrar un producto por su id
        const res = await this.readProducts()
        const product = res.find(product => product.id === id);
        !product ? console.log("Not found") : console.log(product);
        return product;
    }

    delateProductsById = async (id) =>{ // Metodo para eliminar por el id
        const  res = await this.readProducts() 
        const prod = res.filter(product => product.id !== id)
        !prod ? console.log('Not found')
        :await this.writeProducts(prod)
    }

    updateProducts = async ({id, ...product}) => { // Metodo para modificar
        await this.delateProductsById(id)
        const productOld = await this.readProducts();
        const updateProduct = [{...product , id}, ...productOld]
        await this.writeProducts(updateProduct)
    }
} 

class Product {
    static id = 1; // Contador para los id

    constructor(title, description, code, price, status, stock, category, thumbnail) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = true;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
        this.id = Product.id++; // Incrementamos el id en 1
    }
}

// const manager = new ProductManager(); // Creamos una instancia de ProductManager

// manager.addProducts("Laptop", "Laptop msi ...", "tec1234", "1500", "true", "100", "Tecnologia", "url/fasdfasdf");


// manager.getProducts();