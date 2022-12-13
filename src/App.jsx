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
const Son = () => <section>Son<Wrapper /></section>

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


const Wrapper = () => {
  const { appState, setAppState } = useContext(appContext)
  const dispatch = action => {
    setAppState(reducer(appState, action))
  }
  return <UserModifier dispatch={dispatch} state={appState} />
}

const UserModifier = ({dispatch, state}) => {
  const onChange = e => {
    dispatch({
      type: 'updateUser',
      payload: { name: e.target.value }
    })
  }
  return (
    <div>
      <input value={state.user.name} onChange={onChange} />
    </div>
  )
}
