import express from 'express';
const app = express();
import cors from 'cors';


import connectDB  from './config/db.js';
import notesRoute from './route/notesRoute.js';
import rateLimiter from './middleware/rateLimiter.js';


const PORT = process.env.PORT || 5001;


// what is an Endpoint ==> an endpoint is a combination of url + http method that lets the client interact with the server

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(rateLimiter);


app.use('/api/notes' , notesRoute);

// simple custom middleware 
// app.use((req , res , next)=>{
//     console.log(`req method is ${req.method}   and req url  is  ${req.url}`);
//     next();
// })


connectDB().then( ()=> { app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})
});



// app.use('/api/notes', notesRoute);
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});


// mongodb+srv://vinay:vinay123@cluster0.yynsosc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0




// if there is a endpoint /api/auth, it will be handled by the notesRoute file


// middleware is a function that runs middle between request and response 










// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.post('/data', (req, res) => {
//     // Here you would typically handle the incoming data
//     res.status(201).json({message:' Data received!'});
// }
// );
// app.put('/data/:id', (req, res) => {
//     const id = req.params.id;
//     // Here you would typically update the data with the given id
//     res.json({message: `Data with ID ${id} updated!`});
// });
// app.delete('/data/:id', (req, res) => {
//     const id = req.params.id;
//     // Here you would typically delete the data with the given id
//     res.json({message: `Data with ID ${id} deleted!`});
// });





// post ==>to creatate a new resource
// get ==> to read a resource
// put ==> to update a resource
// delete ==> to delete a resource
// patch ==> to update a resource partially
// options ==> to get the allowed methods for a resource
// head ==> to get the headers of a resource
// connect ==> to establish a connection with a resource    


