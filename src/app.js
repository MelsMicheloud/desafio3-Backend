import express from "express";
import ProductManager from "./components/ProductManager.js";

// crear el servidor

const app = express();
app.use(express.urlencoded({extended : true}));

const productos = new ProductManager();
const readProducts = productos.readProducts();

//llamar al servidor

//llamar al servidor y realizar una consulta

app.get("/products", async (req,res) => { //solicitud de productos de getProducts

    let limit = parseInt(req.query.limit); //limites product por query
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
});

//parametros
app.get("/products/:id", async (req, res)=>{
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id)
    res.send(productById)
})

//crear puerto

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express por local Host ${server.address().port}`)
})

app.on("error", (error) => console.log(`Error del servidor ${error}`))
