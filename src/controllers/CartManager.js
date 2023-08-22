import {promises as fs} from 'fs'
import ProductManager from './ProductManager.js'

const products = new ProductManager();

export default class CartManager {
    constructor(){
        this.path = "./src/models/carts.json"
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
        return cartId;
    }

    addProductInCart = async (cartId, prodId) =>{
        const cartById = this.existCart(cartId)
        console.log(cartById)
        if(!cartById) return "Cart not found"
        const prodById = await products.existProd(prodId)
        if(!prodById) return "Product not found"
        const carts = await this.readCarts()
        const cartFilter = carts.filter(cart=> cart.id != cartId)
        if(cartById.products.some(prod => prod.id === prodById)){
            const productInCart = cartById.products.find(prod = prod.id === prodById)
            productInCart.quantity++
            const cartWithProducs = [productInCart,...cartFilter]
        await this.writeCarts(cartWithProducs)
        return "added to cart"
        }else{
            const cartWithProducs = [{id:cartId, products : [{id:prodById, quantity: 1 }]}, ...cartFilter]
            await this.writeCarts(cartWithProducs)
            return "Product added in Cart"
        }
        
    }

}