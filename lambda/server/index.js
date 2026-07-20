import express from "express"
import rateLimit from 'express-rate-limit'
import morgan from "morgan"
const app = express()
app.listen(3000)

const limit = rateLimit({
    windowMs: 10000,
    max: 5,
    message: "Too many request",
    standardHeaders: true,
    legacyHeaders: false
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(limit)

app.get("/product", (req, res)=>{
    res.json({message: "Hello from get"})
})

app.post("/product", (req, res)=>{
    res.json({message: "Hello from post", body: req.body})
})

app.put("/product/:id", (req, res)=>{
    res.json({message: "Hello from put"})
})

app.delete("/product/:id", (req, res)=>{
    res.json({message: "Hello from delete"})
})

export default app