import express from "express";
import multer from 'multer'
import prodsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import { path } from "path";


const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img') //null hace referencia a que no envia errores
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //Concateno el nombre original de mi archivo con milisegundos con Date.now()
    }
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.engine("handlebars", engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
const upload = multer({ storage: storage })
app.use('/static', express.static(path.join(__dirname, "/public")))

//Server socket.io

const io = new Server(server)
const mensajes = []
const prods = []
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (user) => {
        if (user.rol === "Admin") {
            socket.emit('credencialesConexion', "Usuario valido")
        } else {
            socket.emit('credencialesConexion', "Usuario no valido")
        }
    })

    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        mensajes.push(infoMensaje)
        socket.emit('mensajes', mensajes)
    })

    socket.on('nuevoProducto', (nuevoProd) => {
        prods.push(nuevoProd)
        socket.emit('prods', prods)
    })
})


// Routes 
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)

app.get('/static', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Chat",
        js: "realTimeProducts.js"

    })
})



app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})

