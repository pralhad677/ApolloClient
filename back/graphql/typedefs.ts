import { gql } from 'apollo-server-express'


export const typeDefs = gql`

type Query {
    name:String!,
    users:[User!]!
 
}

type Mutation {
    addUser:User!
}
type User{
  _id:String!
  name:String!
}
type Subscription  {
    users:User!
}
`
