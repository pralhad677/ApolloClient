// import { IUser } from '../Model/User'
import React from 'react'
import _ from 'lodash'

// import _ from 'lodash'

interface P{
  name:string
}
interface K {
  name: string,
  __typename:string
}

interface FilterFunc {
  (arr: K[],
    // setFilterData: React.Dispatch<React.SetStateAction<Omit<K, "__typename"> | null>>,
    // filterData:Omit<K, "__typename"> | null
  ): Omit<K, "__typename"> | null //p[]
}  

  export  let FilterKey:FilterFunc=(arr:K[])=>{
//  let arr1=[]
    
  const [filterData,setFilterData] = React.useState<Omit<K,'__typename'>|null>(null)
   for (let i in arr){
     console.log('in filterKey',arr[i])
     
     console.log(_.pick(arr[i], 'name'))
     setFilterData(_.pick(arr[i],'name'))
    // arr1.push(_.pick(arr[i],'name'))
    
   }
   return filterData
} 