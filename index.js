import "dotenv/config"
import express from 'express'
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
let newId =1
let teaData = []

//add a new tea
app.post("/teas", (req, res)=>{
    console.log("added")
    const {name, price} = req.body
    const newTea = {id: newId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea) 
})

//get all teas
app.get("/teas", (req, res)=>{
    console.log("get all")
    res.status(200).send(teaData)
})

//find a tea using params or req or url or id
app.get("/teas/:id", (req, res)=>{
    console.log("got the tea")
    const reqtea = teaData.find(tea => tea.id === parseInt(req.params.id))
    if(!reqtea){
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(reqtea)
})

 //update tea
 app.put("/teas/:id", (req, res)=>{
    console.log("updated")
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("No such Tea Exists")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(201).send(`Tea Updated: ${tea}`)
 })

 //delete a tea
 app.delete("/teas/:id", (req, res)=>{
    console.log("delete")
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("index not found")
    }
    teaData.splice(index, 1)
    return res.status(201).send("deleted")
 })

app.listen(port, ()=>{
    console.log(`Server is running at Port: ${port}...`);
})
