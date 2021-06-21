import React from 'react'
import {useMutation,gql} from '@apollo/client'


// https://hasura.io/learn/graphql/react/mutations-variables/3-create-mutation/
interface Props {

}

const Query_User = gql`
query users{
  users {
    name
  }
}
`
interface User{
  _id?:string,
  name:string,
}

const ADD_USER= gql`
mutation AddUser {
    addUser {
        name,
        
    }
}
`
interface user {
  name: string,
  __typename?:string
}
interface userdata {
  users: user[];
}

let Basic:React.FC<Props>=()=> {
  const [data,{error,loading}]= useMutation<User>(ADD_USER, {
    update: (cache, {data}) => {
      console.log('cache in mutation',cache)
      console.log('data in mutation', (data as any).addUser.name) 
      // console.log('data in mutation', data?.addUser!) 
      const existingListOfUser = cache.readQuery<userdata>({
        query:Query_User
      });
      console.log('existingListOfUser', existingListOfUser) //data1?.users equivalent
      // let data1 = (data as any).addUser.name as string  //to be inserted to cache
      
      // console.log('data1 in button',data1)
      cache.writeQuery<userdata>({
        query: Query_User,
        //data1?.users ko equivalent gareko of app.tsx
        // data: {users: []}
        data: {
          users: [...existingListOfUser!.users, (data as any).addUser],
          // users: [...existingListOfUser!.users, (data as any).addUser],
         
          // users: [data1, ...(existingListOfUser as any).users]
        }
      });
    }
  })
  // console.log('data',data)
  return (
    <div>
      <h1>Add User</h1>
      <button onClick={async () => {
        await data()
      }}>Add User</button>
    </div>
  )
}

export default Basic
