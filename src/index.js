import express from "express"
import prodsRouters from "./routes/products.routes.js"

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// Routes 
app.use('/api/products',prodsRouters)