import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/my-redis")


import {createClient} from "redis"
const redisClient = createClient()

redisClient.on('error', ()=>console.log("Failed to connect with redis"))
redisClient.on("connect", ()=>console.log("Connected"))

redisClient.connect()


import express from "express"
import ProductModel from './product.js'
const app = express()
app.listen(8080)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/product", async (req, res)=>{
    const productsCache = await redisClient.get("products")
    if(productsCache)
    {
        console.log("Serving from cache")
        return res.json(JSON.parse(productsCache))
    }

    const products = await ProductModel.find()

    await redisClient.setEx("products", 30, JSON.stringify(products))
    console.log("Serving from database")
    res.json(products)
})

app.post("/product", async (req, res)=>{
    try {
        const product = await ProductModel.create(req.body)
        res.json(product)
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
})

app.put("/product/:id", async (req, res)=>{
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await redisClient.del("products")
        
        if(!product)
            return res.status(404).json({message: "Product not found with id value"})

        res.json(product)
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
})

app.delete("/product/:id", async (req, res)=>{
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        await redisClient.del("products")

        if(!product)
            return res.status(404).json({message: "Product not found with id value"})

        res.json(product)
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
})