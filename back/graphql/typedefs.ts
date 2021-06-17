import { gql } from 'apollo-server-express'


export const typeDefs = gql`
# directive @skip(if: Boolean!) on FIELD_DEFINITION
directive @skip(if: Boolean!) on FIELD_DEFINITION
# directive @include(if:Boolean!) on FIELD
type Query {
    name:String!,
    users:[User!]!,
    user:User!,
    film:Name!
},
type User {
    # not working
    name:String @skip(if:true)
    _id:ID!,
    token:String,
    message:String!
},
type Mutation {
    # //create
    addUser(name:String!):User!
    login(name:String):User!
}
interface Name{
    name:String!
}

type Film implements Name {
  name:String!,
  genre:String!
}

type Subscription  {
    count:Int!
}


`
