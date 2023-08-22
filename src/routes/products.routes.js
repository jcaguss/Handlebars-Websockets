import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const prodsRouter = Router()
const product = new ProductManager();

const readProducts = await product.readProducts()

prodsRouter.post('/', async (req, res) => {
    const newProduct = ({...req.body, id: readProducts.length +1})
    res.status(200).send(await product.addProducts(newProduct));
})

prodsRouter.get("/", async (req, res)=>{
    const {limit} = req.query
    const prodLimit = readProducts.slice(0,limit)
    !limit ? res.send(readProducts) : res.send(prodLimit)
})

prodsRouter.get("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    const productById = await product.getProductById(id)
    !productById ? res.status(400).send({"error":"The product does not exist"}) : res.status(200).send(productById)
})
prodsRouter.delete("/:id", async(req, res)=>{
    const id = parseInt(req.params.id);
    const deleteProd = await product.delateProductsById(id)
    res.status(200).send(deleteProd)
})

prodsRouter.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updateProduct = req.body
    await product.updateProducts(id,updateProduct)
    res.status(200).send(updateProduct);
})

// Exportamos prodsRouters

export default prodsRouter;