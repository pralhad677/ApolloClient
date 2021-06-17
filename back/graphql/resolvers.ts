import { IResolvers,ApolloError } from 'apollo-server-express'
import { User, IUser } from '../Model/User'


import  jwt from 'jsonwebtoken'
import _ from 'lodash'
interface Obj {
    name: string,
    id: number,
    token?: string,
    message?:string
}
 const lists:Obj[] = [
    {
        name:'jacob',
         id: 112673471283009123,
       
    },
    { 
        name:'ryan',
        id: 223712893712321378,
        
    }
]
const signToken = (id:number):string => {return jwt.sign({ id },`${process.env.SECRET_KEY}` , {
    expiresIn:1000000000000000
  });
};
const createSendToken = (user:IUser, statusCode:number, res:any) => {
    const token = signToken(user.id);
     console.log('token',token)
    
    const cookieOptions = {   
        expires: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ),
        httpOnly: false,
      //ya nira httpOnly:true grda react ma document.cookie grda dekhaena so false gareko cookie grda 
    //   httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') (cookieOptions as any).secure = true;
    console.log(cookieOptions)
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    // user.password = undefined;
  
    // res.status(statusCode).json({
    //   status: 'success',
    //   token,
    //   data: {
    //     user
    //   }
    // });
    // name:String @skip(if:true)
    // id:ID!,
    // token:String,
    // message:String!
    return {
        
        name: user.name,
        _id: user._id,
        token, 
        message:'Authentication successful'
        } 
};
  

export const resolvers: IResolvers = {
    Query: {
        name(parent, args, { req: { user } }, info) {
            console.log('on name')
            console.log('user',user)
            if (!user) {
                // throw new Error('Your are not authenticated')
                throw new NotAllowed('asljd')
// throw new ApolloError('My error message', 'MY_ERROR_CODE', {message:'err'});
            }
            return `my name is ${user.name}`
        },  
        users() { 
            return lists
        },
        async user() {
            const name = 'jacob'
            
            let data = await User.create({ name })
           
            let data1 = _.pick(data, ["name", "_id"])
            return {
                name: data1.name,
                id: data1._id
            }
        },
        film: () => {
            return {
                name: 'hami tin vai',
                genre:'family'
            }
        }
    },
            Mutation: {
                async addUser(parent, { name }:{name:string}) {
                    // throw new Error('error occurs')
                    // let obj:Obj = {
                    //     name,
                    //     id: Math.ceil(Math.random() * 106891230903123),
                        
                    // }
                   
                    // obj = {
                    //     ...obj,
                        
                    // }
                    // lists.push(obj)
                    // console.log('lists in addUser',lists)
                    // return lists
                    let data = new User({
                        name
                    })
                    let user = await data.save()
                    console.log('user',user)
                    return user
                },
              async  login(parent, { name }:{name:string},{res}) {
                    
                    
                   
                    
                  let user = await User.findOne({ name })
                  console.log('user in login ,mutation',user)

                    
                    if (user === null) { 
                        throw new Error('user not found')
                    }
                    else {
                        return createSendToken(user, 200, res)
                    } 
                }
    },
    Name: {
        __resolveType(parent:any, context:any, info:any){
          if(parent.genre){
            return 'Film';
          }
         
          return null; // GraphQLError is thrown
        },
      },
    Subscription: {
        count: {
            
            subscribe(_, _1, { pubsub }) {
                let count = 0
                setInterval(() => {
                  ++count
                  pubsub.publish('count', {
                    count
                  })
                },1000)
                return pubsub.asyncIterator('count')
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