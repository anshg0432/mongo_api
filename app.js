const express = require('express')
const {ObjectId} = require('mongodb')
const {connectToDb, getDb} = require('./db')
// init app & middleware

const app = express()
app.use(express.json())

// db connection
let db
connectToDb((err)=>{
    if(!err){
        app.listen(80,()=>console.log('http://localhost:80'))
        db = getDb()
    }else
    console.log(err)

})



// routes
app.get('/books',(req,res)=>{
    //current page
    const page = req.query.p || 0
    const booksPerPage = 1
    console.log(page)
    let books = []
    db.collection('books')
        .find() // cursor toArray forEach
        .sort({author: 1})
        .skip(page* booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(()=>{
            res.status(200).json(books)
        })
        .catch(()=>{
            res.status(500).json({error: 'Could not fetch the documents'})
        })
   
})


app.get('/books/:id',(req,res)=>{
    
    // console.log(typeof req.params.id)
    
    if(ObjectId.isValid(req.params.id)){
    db.collection('books')
    .findOne({_id: new ObjectId( req.params.id )})
    .then(doc =>{
        res.status(200).json(doc)
    }) 
    .catch(err=>{
        res.status(500).json({error:'Could not fetch the document'})
    })}
    else{
        res.status(500).json({error: "Not a valid doc id"})
    }
})

app.post('/books',(req,res)=>{
    const book = req.body
    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    }).catch(err=>{
        res.status(500).json({err:'could not create a new doc'})
    })
})


app.delete('/books/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id:new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({error: 'Could not delete the document'})
        })
        
    }else{
        res.status(500).json({error: 'Not a valid doc id'})
    }
})

app.patch('/books/:id',(req,res)=>{
    const updates = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({_id:new ObjectId(req.params.id)},{$set:updates})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({error: 'Could not delete the document'})
        })
        
    }else{
        res.status(500).json({error: 'Not a valid doc id'})
    }
})