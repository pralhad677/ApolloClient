import express from "express"
const app=express()
import {ApolloServer,PubSub} from 'apollo-server-express'
import dotenv from 'dotenv'
//using graphql --->we dont need body parser
dotenv.config({path:'./dotenv.env'})
// import {schema} from './Graphql/graphql'
import {resolvers} from './graphql/resolvers'
import { typeDefs } from './graphql/typedefs';
// import mongoose from 'mongoose'
import mongoose from 'mongoose'
import http from 'http'

// import cors from 'cors'



let pubsub = new PubSub()

// app.use(cors({origin:'http://localhost:3000'}))

const server = new ApolloServer({
   
 
    typeDefs,
    resolvers,
    // context: ({{ req, res }: any}) => ({ req,res,pubsub }),
    context: ({ req, res,connection }: any) => (({ req, res, pubsub,connection })),
    subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
          console.log('xxx');
          console.log(connectionParams);
        },
      },
    // subscriptions: {
    //     path: '/subscriptions'
    //   },
});
const httpServer = http.createServer(app);
server.applyMiddleware({ app, path: '/graphql' })

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
        console.log('app is listening on port 3005/graphql')
        console.log(
            `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`,
          );
    }) 
}).catch(console.log)

process.on('unhandledRejection', (err:Error) => {
    
    console.log(err?.name,err?.message);
    process.exit(1);
});

