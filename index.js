import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRouter from './routes/posts.js';
import dotenv from 'dotenv';

const app = express()

dotenv.config();

app.use(bodyParser.json({"limit":"30mb", "extended":true}))
app.use(bodyParser.urlencoded({"limit":"30mb", "extended":true}))

app.use(cors())

app.use('/posts',postRouter)

const connection_url = process.env.CONNECTION;
const port = process.env.PORT || 5000;

mongoose.connect(connection_url, {useNewUrlParser : true, useUnifiedTopology : true})
        .then(()=> app.listen(port, () => console.log(`Server running in port : ${port}`)))
        .catch((error)=> console.log(error.message))

