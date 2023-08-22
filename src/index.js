import express from "express"
import prodsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"


const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// Routes 
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)