import React from 'react'

interface contextType {
  auth: boolean,
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = React.createContext<contextType>({
  auth: false,
  setAuth:()=>{}
} as contextType)

 interface Props {

}
let Index:React.FC<Props>=({children})=> {
  const [auth, setAuth] = React.useState<boolean>(false)
  let data = React.useMemo(() => {
    return {
      auth,
      setAuth
      }
  },[auth,setAuth])
  return (
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  )
}

export default Index
