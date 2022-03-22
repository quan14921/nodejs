import express from "express";
import homeRoute from "./routes/home"
import productRoute from "./routes/product"
import categoryRoute from './routes/category'
import { checkAuth } from "./middlewares/checkAuth";
import mongoose from "mongoose";
const app = express();

mongoose.connect('mongodb://localhost:27017/web16308');

app.use(express.json())
app.use(homeRoute);
app.use(checkAuth,productRoute);
app.use("/api",checkAuth,productRoute);
app.use("/api",categoryRoute)



// const server = http.createServer((request, response)=>{
//     console.log(request.url);
//     if(request.url === '/'){
//         response.setHeader("Content-Type" , "text/html");
//         response.write(`
//             <h1>Home Page</h1>
//         `);
//         response.end();
//     }
//     if(request.url === '/products'){
//         console.log("Product Page");

//         response.setHeader("Content-Type" , "text/html");
//         response.write(`
//             <h1>Product Page</h1>
//         `)
//     }
// });


app.listen(8000, ()=>{
    console.log("server is running on port 8000");
});