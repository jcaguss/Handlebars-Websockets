import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const prodsRouters = Router()
const products = new ProductManager();
const readProducts = await products.readProducts()
products.getProducts()

prodsRouters.get("/", async (req, res)=>{
    const {limit} = req.query
    const prodLimit = readProducts.slice(0,limit)
    !limit ? res.send(readProducts) : res.send(prodLimit)
})

prodsRouters.get("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    const productById = await products.getProductById(id)
    ? res.status(400).send({"error":"The product does not exist"}) 
    : res.status(200).send(productById)
})

prodsRouters.post('/', async (req, res) => {
    const newProduct = req.body
    await products.addProducts(newProduct)
    res.status(200).send("The product was added")
})

// Exportamos prodsRouters

export default prodsRouters;