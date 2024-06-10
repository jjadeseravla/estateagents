import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.route.js';
import authRouter from './routes/auth.route.js';
import testRouter from './routes/test.route.js';
import userRouter from './routes/user.route.js';
import bodyParser from 'body-parser';

import postDetailsModel from './models/postDetails.model.js';

console.log(postDetailsModel)

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

app.use('/api/posts', postRouter);
app.use('/api', authRouter);
app.use('/api/test', testRouter);
//http://localhost:8080/api/test/should-be-logged-in
app.use('/api/users', userRouter)

mongoose.connect('mongodb+srv://jade:Guitar12@estatecluster.gayuvrf.mongodb.net/?retryWrites=true&w=majority&appName=estateCluster')
  .then(() => {
    app.listen(8080, () => {
      console.log('server running on 8080')
    });
  }).catch((e) => {
    console.log(e);
  })
