import React from 'react'
interface user {
  name: string,
  __typename?:string
}

export interface StateType{
  data:user[]
 isLoading?: boolean;
 error?: boolean;
}
export interface ActionStateType{
  data: user[],
 isLoading?: boolean;
 error?: boolean;
}


export type Action =
| { type: 'Add', data: ActionStateType }
| { type: 'Delete', data: ActionStateType }
| { type: 'Waiting', data: Omit<ActionStateType,'data'> }

type ReducerType<S, A> = (State: S, action: A) => S;

let Reducer:ReducerType<StateType,Action>=(state:StateType,action:Action):StateType=>{
switch(action.type){
  case 'Add':
    console.log('Add to list ')
    return {
      ...state,
      data:state.data.concat(action.data.data)
        }
  case 'Delete':  
  return {
      ...state,
      data:state.data.concat(action.data.data)
    }
  case "Waiting":
    return {
      ...state,
      isLoading: action.data.isLoading,
      error:action.data.error,
     }
    // return  action.data
      
    
  default:
    console.log('nothing')
            return state
}
}
let initialState:StateType = {
    data:[{
     name:'jacob'
    }],
    isLoading: true,
    error: false
}

 function Redux() {
    let [state,dispatch] = React.useReducer(Reducer,initialState)
  console.log(state)
  console.log(state.data)
    return {
      state,
      dispatch
    }
}
export default Redux