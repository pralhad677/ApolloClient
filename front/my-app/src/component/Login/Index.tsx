import React from 'react'
import { Context } from '../../Context/Index'

import { useHistory, useLocation } from 'react-router-dom'
import {  gql, useMutation } from '@apollo/client';
interface Props {

}

const LOGIN_USER= gql`
  mutation login($name: String!) {
    login(name: $name) {
      name
      _id
      token
      message
     
    }
  }
`;
let Index: React.FC<Props> = ({ children, ...rest }) => {
  const { setAuth } = React.useContext(Context)
  const history = useHistory()
  const { state } = useLocation()
  
  const [login] = useMutation(LOGIN_USER);
  
  // console.log('location',location)

  //we can use useCallback to run async code
  //we can use async function inside of useEffect and invoke it
  // we can run IFFE run async code in useEffect
  // React.useEffect(() => {
  //   const abortController = new AbortController()
  //   void async function fetchData() {
  //     try {
       
  //   let res = await login({ variables: { name: 'kali' } })
  //   console.log('res',res)
  //     } catch (error) {
  //         console.log('error', error);
  //     }
  // }();
  //   return () => {
  //     abortController.abort(); 
  //   } 
  // },[login])
 
  return (
    <div>

    <h1>Login</h1>
      <button onClick={async () => {
        
        let res = await login({ variables: { name: 'kali' } })
        console.log('res,',res.data.login.token)
        res.data.login.token && setAuth(true)
        history.push({
          pathname: '/protected',
          state: { 
            from:state
          }
        })
      }}>Login</button>
    </div>
  )
}

export default Index
