import React from 'react'
import ErrorBoundary from './ErrorBoundary/Index'
import CustomContext, { Context } from './Context/Index'
import { gql, useQuery,useSubscription } from '@apollo/client'
// import _ from 'lodash'
import _ from 'lodash'
import AddUser from './Component/Mutations/Basic'


  


interface Props{  

}

const Query_User = gql`
query users{
  users {
    name
  }
}
`
interface User {
  name: string;
}
interface UserList {
  latestUser: User[];
}

const SubScription_User = gql`
subscription  users{
  users {
    name
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
let App: React.FC<Props> = () => {
  const { state, dispatch } = React.useContext(Context)
  const { data:data1, error, loading } = useQuery<userdata>(Query_User)
  
  console.log('data1', data1?.users)
  let lastItem = data1?.users[data1?.users.length - 1]
  console.log('lastItem',lastItem)
  // console.log('state.data', data1?.users.concat(state.data))
  // let newData = data?.users.concat(state.data)
  // console.log('filterData',filterData)
   
  // const { loading:subscriptionLoading, data } = useSubscription(SubScription_User);

  // console.log('data of subscription,', data) 
  console.log(state.data[0]) 
      React.useEffect(() => {
        const control = new AbortController()
        // dispatch({ type: 'Add', data: { data: [{ name: 'ryan' }] } })
       
        // if (data === undefined) {
        //   if (data1?.users !== undefined) {
        //     dispatch({ type: 'Add', data: { data: data1?.users } }) 
        //   }
        // }
        // else {
        //   if (data?.users !== undefined) {
        //     dispatch({ type: 'Add', data: { data: data?.users } }) 
        //   }
          
        // }
        if (data1?.users !== undefined) {
          
        // dispatch({ type: 'Add', data: { data: [{ name: 'ryan' }] } })
          dispatch({ type: 'Add', data: { data: [lastItem!] } })
        }
        return () => {
          control.abort() 
        } 
      },[dispatch,data1,lastItem])
      // },[dispatch,data,data1])
  // if (state.isLoading ||loading) {
  //   setTimeout(() => {
  //     dispatch({
  //       type: 'Waiting', data: {
  //         isLoading: false,
  //         error:false
  //       }})
  //   },1000)
  //   return <h1>Loading</h1>
  // }
  // if (state.error || error) {
  //   throw new Error('Error occurs :App.tsx')
  // }
  
  return (
    <div>
      <h1>React JS By Facebook</h1>
      <AddUser />
      {
        state.data.map((item, index) => {
       
          return <ol key={index}>
            <li key={index} style={{listStyleType: "lower-alpha"}}>{item.name}</li>
          </ol>
        }) 
      }
    </div>
  )
}

export default function appWithErrorBoundary(props:Props){
  return (
    <ErrorBoundary >
      <CustomContext>

        <App {...props}/>
      </CustomContext>
    </ErrorBoundary>
  
  )
}

// export default App
