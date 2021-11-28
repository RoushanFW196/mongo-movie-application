
const express= require('express'); // importing express
const app = express();

app.use(express.json())
const mongoose = require('mongoose');

const connect =  async ()=>{
    mongoose.connect(" mongodb://127.0.0.1:27017/entertainment")     // connecting mongoose to mongodb server
};

// schema for movie
const movieSchema = new mongoose.Schema(
    {
        movie_name: { type: String, required: true },
        id:{type:Number, required: true},
     
      movie_genre: { type: String, required: true },
     production_year: { type: Date, required: true},
     budget: { type: Number, required: true}
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  const movies=mongoose.model("movie",movieSchema) // movies collection is created inside the entertainment database in mongodb


  // posting a new movie to the database (mongoose always return a promise so thats why use of async and await)
  app.post("/movies", async (req, res) => {
      try{

      
      const movie=await movies.create(req.body)
      res.status(201).send(movie)
      }
      catch(e){
      res.status(500).json({message:e.message})
      }
  })



  // getting  all of the movies
  app.get("/movies",async (req, res) => {
      try{

      
      const movieslist=await movies.find().lean().exec()
      res.status(201).send({movieslist})
      }
      catch(e){
        res.status(500).json({message:e.message})
      }
  })




// getting a single movie ,here id is mongoid 
  app.get("/movies/:id",async (req, res) => {
      try{
        const singlemovie=await movies.findById(req.params.id).lean().exec();
        res.status(201).send({singlemovie})


      }
      catch(e){
          res.status(500).json({message:e.message})
      }
  

  })

// updating a single movie

app.patch("/movies/:id",async (req, res)=>{

    try{
     
        const updatedmovie= await movies.findByIdAndUpdate(req.params.id,req.body,{new:true})

       return res.status(201).send({updatedmovie})

    }
    catch(e){
        res.status(500).json({message:e.message})
    }



})


// deleting a movie

app.delete("/movies/:id",async (req, res)=>{

    try{

    
    const deletedmovie= await movies.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(deletedmovie)

    }
    catch(e){
      return  res.status(500).json({message:e.message});
    }



})






 console.log("hello")

app.listen(1400,  async ()=>{
   await  connect()
    console.log('listening on port 1400');
})