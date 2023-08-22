import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const prodsRouters = Router()
const product = new ProductManager();

const readProducts = await product.readProducts()

prodsRouters.post('/', async (req, res) => {
    const newProduct = ({...req.body, id: readProducts.length +1})
    res.status(200).send(await product.addProducts(newProduct));
})

prodsRouters.get("/", async (req, res)=>{
    const {limit} = req.query
    const prodLimit = readProducts.slice(0,limit)
    !limit ? res.send(readProducts) : res.send(prodLimit)
})

prodsRouters.get("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    const productById = await product.getProductById(id)
    !productById ? res.status(400).send({"error":"The product does not exist"}) : res.status(200).send(productById)
})
prodsRouters.delete("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    const deleteProd = await product.delateProductsById(id)
    res.status(200).send(deleteProd)
})

prodsRouters.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updateProduct = req.body
    await product.updateProducts(id,updateProduct)
    res.status(200).send(updateProduct);
})

// Exportamos prodsRouters

export default prodsRouters;