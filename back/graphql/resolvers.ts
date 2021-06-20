import { IResolvers, ApolloError } from 'apollo-server-express'
import { User, IUser } from '../Model/User'
import faker from 'faker'
import {filterKey} from '../JsUtils/filter'


export const resolvers: IResolvers = {
  Query: {
    name() {
      return 'my name is jacob'
    },
    users: async (parent, args, context, info) => {
     

      let listOfUser = await User.find()
      // console.log('listOfUser', listOfUser)
      console.log(filterKey(listOfUser))
      let mydata = filterKey(listOfUser)
      
      return listOfUser
    //  return mydata
      
      
    }
    
  },
  Mutation: {
    // addUser: async (parent, args, context, info) => {
    //   const name = faker.name.findName();
    //   const user = new User({
    //     name
    //   })
    //   const data = await user.save()
    //   return data
    // },
    addUser: async (parent, args, {pubsub}, info) => {
      const name = faker.name.findName();
      const user = new User({
        name
      })
      const data = await user.save()
      pubsub.publish('users', {
        // count
        users:data
      })
      return data
    }
  },
  Subscription: {
    users: {
        
        subscribe:async (_, _1, { pubsub })=> {
            return pubsub.asyncIterator('users')
        }
    }
} 
}
class NotAllowed extends ApolloError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 'Not Allowed TO Access', properties);

    Object.defineProperty(this, 'name', { value: 'NotAllowed' });
  }
}