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
      <Brother />
      <Sister />
      <Cousin />
    </appContext.Provider>
  )
}

// Brother 用于展示 User 数据
const Brother = () => (
  <section>
    Brother
    <User />
  </section>
)

// Sister 用于修改 User 数据
const Sister = () => (
  <section>
    Sister
    <UserModifier />
  </section>
)

const Cousin = () => <section>Cousin</section>

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

const connect = Component => {
  return props => {
    const { appState, setAppState } = useContext(appContext)
    const dispatch = action => {
      setAppState(reducer(appState, action))
    }
    return <Component {...props} dispatch={dispatch} state={appState} />
  }
}

const UserModifier = connect(({ dispatch, state, children }) => {
  const onChange = e => {
    dispatch({
      type: 'updateUser',
      payload: { name: e.target.value }
    })
  }
  return (
    <div>
      {children}
      <input value={state.user.name} onChange={onChange} />
    </div>
  )
})
