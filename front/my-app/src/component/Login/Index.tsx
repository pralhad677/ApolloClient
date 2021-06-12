import React from 'react'
import { Context } from '../../Context/Index'

import { useHistory,useLocation} from 'react-router-dom'
interface Props {

}
let Index: React.FC<Props> = ({ children, ...rest }) => {
  const { setAuth } = React.useContext(Context)
  const history = useHistory()
  const {state} = useLocation()
  // console.log('location',location)
  return (
    <div>

    <h1>Login</h1>
      <button onClick={() => {
        
        setAuth(true)
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
