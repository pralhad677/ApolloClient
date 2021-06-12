import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { Switch, Route,NavLink,useHistory,useLocation } from 'react-router-dom'
import Context from './Context/Index'
import {Context as Context1} from './Context/Index'
import Protected from './component/private/index'
import Login from './component/Login/Index'

interface Props {

}

// const mutation = `
// mutation AddUser($name:String!){
//   addUser(name:$name){
//     name,
//     id
//   }
// }`



const ADD_TODO = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      name
      id
     
    }
  }
`;


// const mutation1 = gql`
//   mutation AddUser($name:String!){
//   addUser(name:$name){
//     name,
//     id
  // }
// `
  

let App: React.FC<Props> = () => {
  const [addUser] = useMutation(ADD_TODO);
  const { setAuth } = React.useContext(Context1)
  const history = useHistory()
  const {state} = useLocation()
  let data1 = React.useCallback(() => {
    let myfn = async () => {
        let res = await addUser({ variables: { name: 'kali' } })
        console.log('res',res)
      }
      myfn()
  },[addUser])
  
  React.useEffect(() => {
    // 
    data1()
  },[data1])
  
  return (
    <Context>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/protected">Protected</NavLink>
        </li>
      </ul>
      
    <Switch>
        <Route exact path="/">
          <div>

          
          <h1>Home</h1>
         
          </div>
        </Route>
        <Protected path="/protected">
        <div>

          

          <h1>protected</h1>
            <button onClick={() => {
              setAuth(false)
              history.push({
                pathname: '/login',
                state: {
                  from:state
                }
              })

}}>Logout</button>
</div>
        </Protected>
        <Route path="/login">
          <Login />
        </Route>
      <Route path="*"><h1>page not found</h1></Route>
  </Switch>
    </Context>
  )
}

export default App
