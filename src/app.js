import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express();
app.use(express.urlencoded({extended : true})); 

const productos = new ProductManager()

const readProducts = productos.readProducts()

console.log(await readProducts) 
app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit); 
    if(!limit) return res.send(await readProducts);
    let allProducts = await readProducts; 
    let productlimit = allProducts.slice(0, limit);
    res.send(productlimit);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    res.send(productById)
    
});

const PORT = 8080;
const server = app.listen(PORT,() =>{ 
    console.log(`express por el local host ${server.address().port}`) 
})

server.on("error", (error) => console.log(`error en el servidor ${error}`))

