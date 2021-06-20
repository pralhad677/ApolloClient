import React from 'react'
import Redux,{StateType,Action} from '../Redux/Index'

interface InitContextProps {
  state: StateType;
  dispatch: React.Dispatch<Action>;
}
interface Props {

}

export const Context = React.createContext(({} as InitContextProps))

let Index: React.FC<Props> = ({ children }) => {
  const {state,dispatch} = Redux()
  
  
  return (
    <Context.Provider value={{ state,dispatch }} >
        {children}
    </Context.Provider>
  )
}

export default Index
