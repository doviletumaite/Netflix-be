import express from "express"
import { getMovies, writeMovies } from "../lib/tools-fs.js"
import uniqid from "uniqid"
// http://localhost:3003/movies
const mediaRouter = express.Router()

mediaRouter.get("/", async (req, res, next) => {
    try {
     const movies = await getMovies()
     res.send(movies)  
    } catch (error) {
        next(error)   
    }
})

mediaRouter.get("/:imdbID", async (req, res, next) => {
    try {
    const movies = await getMovies()
    const movie = movies.find(m => m.id === req.body.imdbID)
    if(movie) {
        res.send(movie)
    }    
    } catch (error) {
        next(error)   
    }
})

mediaRouter.post("/", async (req, res, next) => {
    try {
    const newMovie = {...req.body, imdbID: uniqid(), createdAt: new Date()}
    const movies = await getMovies()
    movies.push(newMovie)
    await writeMovies(movies)
    res.status(201).send(newMovie)   
    } catch (error) {
        next(error)   
    }
})

mediaRouter.put("/:imdbID", async (req, res, next) => {
    try {
        const movies = await getMovies() 
        const index = movies.findIndex(m => m.id === req.params.imdbID)
        const movieToModify = movies[index]
        const updatesField = req.body
        const updatedMovie = {...movieToModify, ...updatesField}
        movies[index] = updatedMovie
        await writeMovies(movies)
        res.send(updatedMovie)   
    } catch (error) {
        next(error)   
    }
})

mediaRouter.delete("/:imdbID", async (req, res, next) => {
    try {
        const movies = await getMovies()
        const filteredMovies = movies.filter(movie => movie.id !== req.params.imdbID)
        console.log(filteredMovies)
        await writeMovies(filteredMovies)
        res.status(204).send()    
    } catch (error) {
        next(error)  
    }
})


mediaRouter.get("/:imdbID/reviews", async (req, res, next) => {
    try {
        const movies = await getMovies()
      const movie = movies.find((movie) => movie.id === req.params.imdbID);
      if (movie) {
        movie.reviews = movie.reviews || []
        res.send(movie.reviews)
      } else {
        next(createHttpError(404))
      }
    } catch (error) {
      next(error)
    }
  });

  mediaRouter.put("/:imdbID/reviews", async (req, res, next) => {
    try {
      const { comment, rate } = req.body
      const review = { comment, rate, createdAt: new Date()}
        const movies = await getMovies()
        const index = movies.findIndex(m => m.id === req.params.imdbID)
      let moviesNoNewReview = movies[index]
      
      moviesNoNewReview.comments = moviesNoNewReview.comments || []
      const movieReviewed = {
        ...moviesNoNewReview,
        ...req.body,
        comments: [...moviesNoNewReview.comments, review],
        updatedAt: new Date(),
        id: req.params.imdbID,
      };
      
      movies[index] = postWithNewComment
  
      writeBlogPosts(movies)
  
      res.send(movieReviewed)
    } catch (error) {
      next(error);
    }
  });
export default mediaRouter