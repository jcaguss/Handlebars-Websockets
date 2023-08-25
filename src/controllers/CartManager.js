import {promises as fs} from 'fs'


export default class CartManager {
    constructor(){
        this.path = "./src/models/carts.json"
        this.pathProd = "./src/models/products.json"
    }

    readProducts = async () => {
        try{
            const prods = await fs.readFile(this.pathProd, "utf-8")
            return JSON.parse(prods)
        }catch{
            return[]
        }
    }
    existProd = async (id) => {
        const prods = await this.readProducts();
        return prods.find(prod => prod.id === id)
    }
    readCarts = async () =>{
        try{
            const carts = await fs.readFile(this.path, "utf-8")
            return JSON.parse(carts)
        }catch{
            return[]
        }
        
    }
    
    writeCarts = async (cart) => {
        await fs.writeFile(this.path,JSON.stringify(cart));
    }

    addCarts = async (cart) => {
        const cartsOld = await this.readCarts();
        const cartsAll = [...cartsOld,{...cart, products : []}]
        await this.writeCarts(cartsAll)
        return "Cart added"
    }
    existCart = async (id) => {
        const carts = await this.readCarts();
        return carts.find(cart => cart.id === id)
    }
    
    getCartById = async (id) =>{ 
        const cartId = await this.existCart(id);
        if(!cartId) return "Not found"
        console.log(cartId)
        return cartId;
        
    }

    addProductInCart = async (cartId, prodId) =>{
        const cartById = await this.existCart(cartId)
        if(!cartById) return "Cart not found"
        
        const prodById = await this.existProd(prodId)
        console.log(prodById)
        if(!prodById) return "Product not found"
        
        const carts = await this.readCarts()
        const cartFilter = carts.filter(cart=> cart.id != cartId)
        console.log(cartById.products.some((prod) => prod.id === prodId))
        if(cartById.products.some((prod) => prod.id === prodId)){
            const productInCart = cartById.products.find((prod) => prod.id === prodId);
            productInCart.quantity++;
            const cartWithProducs = [{id : cartId, products : [productInCart]},...cartFilter];
        await this.writeCarts(cartWithProducs);
        return "added to cart";
        }else{
            const cartWithProducs = [{id:cartId, products : [{id : prodId, quantity: 1 }]}, ...cartFilter];
            await this.writeCarts(cartWithProducs);
            return "Product added in Cart";
        }
        
    }
}

const cart = new CartManager;

cart.addProductInCart(1,1);
// cart.getCartById(1);
// const prodss = await product.getProductById(1);
// console.log(prodss)