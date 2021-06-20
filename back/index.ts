import express from "express"
const app=express()
import {ApolloServer,PubSub,AuthenticationError} from 'apollo-server-express'
import dotenv from 'dotenv'
//using graphql --->we dont need body parser
dotenv.config({path:'./dotenv.env'})
// import {schema} from './Graphql/graphql'
import {resolvers} from './graphql/resolvers'
import { typeDefs } from './graphql/typedefs';
// import mongoose from 'mongoose'
import mongoose from 'mongoose'
import http from 'http'
import  jwt from 'jsonwebtoken'
import { User } from './Model/User'
import base64url from "base64url";

import cors from 'cors'
import cookieParser from 'cookie-parser'



const pubsub = new PubSub()
 


// app.use(cors({
//     credentials:true,
//     origin: 'http://localhost:3000'
// }))

app.use(cookieParser())


const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({{ req, res }: any}) => ({ req,res,pubsub }),
    context: async ({ req, res, connection }: any) => {
        
        
           
            
        return { req, res, pubsub, connection }
    },
    subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
          console.log('xxx');
          console.log(connectionParams);
        },
    },
    // schemaDirectives:{@skip}
});
const httpServer = http.createServer(app);
server.applyMiddleware({ app, path: '/graphql',cors: {
    credentials:true,
    origin: 'http://localhost:3000'
} })

server.installSubscriptionHandlers(httpServer);


// server.installSubscriptionHandlers();

console.log('hey') 

// 'mongodb://localhost/new'
mongoose.connect('mongodb://localhost:27017/jwt1',{
    // newURLParser:true
    useNewUrlParser: true,
    useUnifiedTopology: true
     
}).then(() => { 
    console.log('connected to mongodb')
    httpServer.listen(process.env.PORT,()=>{
        console.log('app is listening on port 3007/graphql')
        console.log(
            `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`,
          );
    }) 
}).catch(console.log)

process.on('unhandledRejection', (err:Error) => {
    
    console.log(err?.name,err?.message);
    process.exit(1);
});

 