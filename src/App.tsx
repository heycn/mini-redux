import * as React from 'react'

const { createContext, useState, useContext } = React

const appContext = createContext<any>(null)

export const App = () => {
  const [appState, setAppState] = useState({
    user: { name: 'ChenNan', age: 22 }
  })
  const contextValue = { appState, setAppState }
  return (
    <appContext.Provider value={contextValue}>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </appContext.Provider>
  )
}

const ComponentOne = () => <section>组件1<User /></section>
const ComponentTwo = () => <section>组件2<UserModifier /></section>
const ComponentThree = () => <section>组件3</section>

const User = () => {
  const contextValue = useContext(appContext)
  return <div>UserName: {contextValue.appState.user.name}</div>
}

const reducer = (state: any, { type, payload }: any) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}

const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppState(reducer(appState, { type: 'updateUser', payload: { name: e.target.value } }))
  }

  return (
    <div>
      <input
        value={appState.user.name}
        onChange={onChange}
      />
    </div>
  )
}
