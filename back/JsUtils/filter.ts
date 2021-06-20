import { IUser } from '../Model/User'
import _ from 'lodash'
interface P{
  name:string
}

interface FilterFunc<T,U> {
  (arr:T[]):U[]
} 

  export  let filterKey:FilterFunc<IUser,P>=(arr:IUser[])=>{
 let arr1=[]
   for (let i in arr){
     console.log(arr[i])
     
    //  _.pick(arr[i],'name')
    arr1.push(_.pick(arr[i],'name'))
    
   }
   return arr1
}