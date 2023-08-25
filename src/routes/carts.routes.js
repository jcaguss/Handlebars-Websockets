import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartsRouter = Router()
const cart = new CartManager();

const readCarts = await cart.readCarts();

cartsRouter.post('/', async (req, res) => {
    const newCart = (req,{id: readCarts.length +1})
    res.status(200).send(await cart.addCarts(newCart));
})

cartsRouter.get("/", async (req, res)=>{
    const {limit} = req.query
    const cartLimit = readCarts.slice(0,limit)
    !limit ? res.send(readCarts) : res.send(cartLimit)
})

cartsRouter.get("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    const cartById = await cart.getCartById(id)
    !cartById ? res.status(400).send({"error":"The cart does not exist"}) : res.status(200).send(cartById)
})

cartsRouter.post("/:cid/products/:pid" , async(req, res) => {
    const cartId =  parseInt(req.params.cid)
    console.log(cartId)
    const prodId =  parseInt(req.params.pid)
    console.log(prodId)
    res.status(200).send(await cart.addProductInCart(cartId,prodId))
})

export default cartsRouter;