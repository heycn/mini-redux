import * as React from 'react'
const { useState, useContext } = React

const appContext = React.createContext(null)

export const App = () => {
  const [appState, setAppState] = useState({
    user: { name: 'heycn', age: 22 }
  })

  const contextValue = { appState, setAppState }

  return (
    <appContext.Provider value={contextValue}>
      <Parent />
      <Son />
      <Grandson />
    </appContext.Provider>
  )
}

// Parent 用于展示 User 数据
const Parent = () => <section>Parent<User /></section>

// Son 用于修改 User 数据
const Son = () => <section>Son<UserModifier /></section>

const Grandson = () => <section>Grandson Component</section>

const User = () => {
  const contextValue = useContext(appContext)
  return <div>UserName:{contextValue.appState.user.name}</div>
}

const reducer = (state, { type, payload }) => {
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
  const onChange = e => {
    setAppState(reducer(appState, {
      type: 'updateUser',
      payload: { name: e.target.value }
    }))
  }
  return (
    <div>
      <input value={appState.user.name} onChange={onChange} />
    </div>
  )
}
