import * as React from 'react'
const { useState, useEffect, useContext } = React

const appContext = React.createContext(null)

const connect = Component => {
  return props => {
    const { state, setState } = useContext(appContext)
    const [_, forceUpdate] = useState({})
    useEffect(() => {
      store.subscribe(() => {
        forceUpdate({})
      })
    }, [])
    const dispatch = action => {
      setState(reducer(state, action))
    }
    return <Component {...props} dispatch={dispatch} state={state} />
  }
}

const store = {
  state: {
    user: { name: 'heycn', age: 22 }
  },
  setState(newState) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  }
}

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <Brother />
      <Sister />
      <Cousin />
    </appContext.Provider>
  )
}

// Brother 用于展示 User 数据
const Brother = () => {
  console.log('Brother render!')
  return (
    <section>
      Brother
      <User />
    </section>
  )
}

// Sister 用于修改 User 数据
const Sister = () => {
  console.log('Sister render!')
  return (
    <section>
      Sister
      <UserModifier />
    </section>
  )
}

const Cousin = () => {
  console.log('Cousin render!')
  return <section>Cousin</section>
}

const User = connect(({ state, dispatch }) => {
  console.log('User render!')
  return <div>UserName:{state.user.name}</div>
})

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

const UserModifier = connect(({ dispatch, state }) => {
  const onChange = e => {
    dispatch({
      type: 'updateUser',
      payload: { name: e.target.value }
    })
  }
  console.log('UserModifier render!')
  return (
    <div>
      <input value={state.user.name} onChange={onChange} />
    </div>
  )
})
