const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3003;
const dbconfig = {
    url: 'mongodb+srv://itzel:againstme@cluster0-vutpm.mongodb.net/test?retryWrites=true&w=majority',
    dbname:'academia',
    collections: {
        posts:'posts',    
}
};


  let mongoConnect;
   MongoClient.connect(dbconfig.url,(err,client)=>{
        if (err){
            console.log(err);
            client.close();            
        }else { 
            console.log('connection to mongo db ok!')
            mongoConnect=client;
        }
    });

app.get('/posts', (req,res)=>{
    const db=mongoConnect.db('academia');

   const collection= db.collection('posts')
   return collection.find({}).toArray(function(err,post){
    if(err)res.send(400)  
    console.log("Found the following records")  
    console.log(posts);
    res.send(posts);
    })
})

app.post('/posts', (req, res)=>{
    const db=mongoConnect.db('academia');
    const post = req.body;
   const collection= db.collection('posts')
   return collection.insert(post).toArray((err,post)=>{
       if(err) res.send(400)
        res.send(post)
   })
})
  app.listen(port, console.log('web server listening on port '+port));