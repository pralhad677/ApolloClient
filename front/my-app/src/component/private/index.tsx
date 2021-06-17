import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context } from '../../Context/Index'
import Cookies from 'universal-cookie'
import axios from 'axios'

import { useQuery, gql, useMutation } from '@apollo/client';

const cookies = new Cookies();

interface Props {
path:string
}
const Name = gql`
query Name {
  name
}
`
let Index: React.FC<Props> = ({ children, ...rest }) => {
  const { auth, setAuth } = React.useContext(Context)
  console.log('auth',auth)
  console.log('setAuth', setAuth)
  // const {data} = useQuery(Name)
    
    
  return (
    <Route {...rest}   {...rest} render={() => {
    
      return auth === true
        ? children
        : <Redirect to='/login' />
    }} />
  )
}

export default Index
