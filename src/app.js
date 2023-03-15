//require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './router';
import path from 'path';
dotenv.config();

class App {
  constructor() {
    
    this.server = express();
    mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(
      '/files',
      express.static(path.resolve
        (__dirname,'..','uploads')),
    );
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;