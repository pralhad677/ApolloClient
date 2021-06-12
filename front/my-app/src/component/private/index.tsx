import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {Context} from '../../Context/Index'
interface Props {
path:string
}
let Index: React.FC<Props> = ({ children, ...rest }) => {
  const { auth, setAuth } = React.useContext(Context)
  console.log('auth',auth)
  console.log('setAuth',setAuth)
  return (
    <Route {...rest}   {...rest} render={() => {
    
      return auth === true
        ? children
        : <Redirect to='/login' />
    }} />
  )
}

export default Index
