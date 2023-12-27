const express = require("express")
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const app = express();
app.use(express.json())
const dat = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
})
const data = mongoose.model("data",dat)
var my_data = new data({
    name:"Arbaz",
    email:"arbazirfan14@gmail.com",
    age:23
})
var obj_arr = [{   
 name:"Arbaz",
email:"arbazirfan14@gmail.com",
age:23
},
{
    name:"Imran",
    email:"abc@xyz.com",
    age:67 
},{
    name:"Nawaz",
    email:"sharif@420.com",
    age:80
}]
mongoose.connect('mongodb+srv://admin:admin@cluster0.ezsgqkf.mongodb.net/queries')
.then(()=>{console.log("connection successful")})
.catch((err)=>{console.log(err)})
// create
app.post('/save',(req,res)=>{
    my_data.save()
    res.send("data uploaded succesful")
})
app.post('/create',(req,res)=>{
    data.create(my_data)
    res.send("data uploaded succesful")
})
app.post("/insertmany",(req,res)=>{
    data.insertMany(obj_arr)
    res.send("data uploaded succesful")
})
// Read
 app.get("/find", async(req,res)=>{
    const name = req.body.name;
 await data.find({name:name})
 .then((result)=>{ res.json({data:result})
     console.log(result)})
     .catch((err)=>{console.log(err)})
 } )
app.get ("/findbyid:id",async (req,res)=>{
    const id = req.params.id
await data.findById(id)
.then((result)=>{
    res.send(result)
    console.log(result)})
.catch((err)=>{console.log(err)})
})
app.get("/findone", async(req,res)=>{
    const name = req.body.name;
    await data.findOne({name:name}).then((result)=>{
        res.send(result)
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})
// update
app.put('/findbyidandupdate:id',async(req,res)=>{
    const id = req.params.id
await data.findByIdAndUpdate(id,{name:"nawaz sharif"})
.then((result)=>{
    res.send(result)
    console.log(result)
})
.catch((err)=>{console.log(err)})
})
app.put('/findoneandreplace', async(req,res)=>{
         const name = req.body.name;
    await data.findOneAndReplace({name:name},{name:"Nawaz",email:"nawaz@320.com"})
    .then((result)=>{
        res.send("data updated succeful")
        console.log("replace successful",result)
    })
    .catch((err)=>{console.log(err)})
})
app.put("/findoneandupdate", async(req,res)=>{
    const name = req.body.name;
    await data.findOneAndUpdate({name:name},{email:"lorem@ipsum",age:90})
    .then((result)=>{
        res.send("data updated successful")
        console.log("succesfully update",result)})
    .catch((err)=>{console.log(err)})
})
app.put("/replaceone:id", async(req,res)=>{
    const id = req.params.id
    await data.replaceOne({_id:id},{name:"shehbaz",age:80,email:"shehbaz@420.com"})
    .then((result)=>{
        res.send("data replace successful")
        console.log("replaceone succesful",result)})
    .catch((err)=>{console.log(err)})
})
app.put('/updatemany',async(req,res)=>{
        const age= req.body.age;
    await data.updateMany({age:age},{email:"iam@80.com"})
    .then((result)=>{
        res.send("all data updated successful")
        console.log("all updated succesful",result)})
    .catch((err)=>{console.log(err)})
})
app.put("/updateone", async(req,res)=>{
    const age = req.body.age;
    await data.updateOne({age:age},{email:"iam@80+.com"})
    .then((result)=>{
        res.send("updated succesful")
       console.log("updated succesful",result)
    })
    .catch((err)=>{
       console.log(err)
    })
})

// delete
app.delete('/deleteone',(req,res)=>{
    // delete first comming object with filter
    data.deleteOne({age:23}).then((result)=>{
        if(result.deletedCount==1){      
    res.send("data deleted succesful")
        console.log("deleted successful")
    }else{
        console.log("not found")
    }}).catch((err)=>{console.log("getting error while deleting",err)})
})
app.delete('/deletemany',(req,res)=>{
    // delete all objects with given filters
    data.deleteMany({age:23}).then((result)=>{
        console.log(result)
        if(result.deletedCount!=0){
    res.send("data deleted succesful")
            console.log("deleted multiple object successful")
            return;
        }
        console.log("data not found")
    
    }).catch((err)=>{console.log("getting error while deleting",err)})
})
// findOneAndDelete() command by a document's _id field. In other words, findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id }).
app.delete("/findoneanddelete:id",(req,res)=>{
    const id = req.params.id
    data.findOneAndDelete({_id:id})
    .then(()=>{
    res.send("data deleted succesful")
        console.log("deleted succesful")}
        )
    .catch((err)=>{console.log(err)})   
})
app.delete("/findbyidanddelete:id",(req,res)=>{
    const id = req.params.id
    data.findByIdAndDelete(id)
    .then(()=>{console.log("deleted by id successful")})
    .catch((err)=>{console.log(err)})
})
// not accepting findByIdAndRemove
// data.findByIdAndRemove("658478fc84f0ee55157c2c02")
// .then((result)=>{console.log("remove succesfully",result)})
// .catch((err)=>{console.log(err)})

// async function ab(){
//  await data.findByIdAndRemove("658478fc84f0ee55157c2c02")
//  .then((result)=>{console.log("remove succesfully",result)})
//  .catch((err)=>{console.log(err)})
// } ab()
app.listen(3001,()=>{console.log("runiing on 3001")})