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
import { AnyCnameRecord } from "dns"
import  jwt from 'jsonwebtoken'
import { User } from './Model/User'
import base64url from "base64url";

import cors from 'cors'
import cookieParser from 'cookie-parser'



let pubsub = new PubSub()
 


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
        let token:string
        if (req?.headers?.authorization) {
            console.log('req.headers.auth found')
        token = req.headers.authorization.split(' ')[1];
        console.log(token)
        if (!token) { 
           
            throw  new Error('You are not logged in! Please log in to get access.',)
            
            }
            console.log('base64url',base64url(process.env.SECRET_KEY!))
            try {
                var decoded = jwt.verify(token,`${process.env.SECRET_KEY}`) as any;
            } 
            catch(err){
                console.log(err)
                console.log(err.message)
            }
            // console.log((<any>decoded).user)
            // console.log('decoded',decoded)
            const currentUser = await User.findById(decoded.id as object);
            console.log('currentUser' ,currentUser)
            if (!currentUser) {
                throw new Error ('The user belonging to this token does no longer exist')
             }
              req.user = currentUser;
        }
        console.log(req.user)
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
mongoose.connect('mongodb://localhost:27017/jwt',{
    // newURLParser:true
    useNewUrlParser: true,
    useUnifiedTopology: true
     
}).then(() => { 
    console.log('connected to mongodb')
    httpServer.listen(process.env.PORT,()=>{
        console.log('app is listening on port 3006/graphql')
        console.log(
            `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`,
          );
    }) 
}).catch(console.log)

process.on('unhandledRejection', (err:Error) => {
    
    console.log(err?.name,err?.message);
    process.exit(1);
});

