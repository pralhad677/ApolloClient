import { gql } from 'apollo-server-express'


export const typeDefs = gql`
type Query {
    name:String!,
    users:[User!]!,
    user:User!
},
type User {
    name:String!,
    id:ID!
},
type Mutation {
    addUser(name:String!):[User!]!
}

type Subscription  {
    count:Int!
}


`
