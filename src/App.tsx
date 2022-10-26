import * as React from 'react'

const { createContext, useState, useContext, useMemo, useEffect } = React

const appContext = createContext<any>(null)

const connect = (Component: ({ dispatch, state }: any) => JSX.Element) => {
  console.log('connect render')
  return (props: any) => {
    const { state, setState } = useContext(appContext)
    const [, update] = useState({})
    useEffect(() => {
      store.subscribe(() => update({}))
    }, [])
    const dispatch = (action: any) => {
      setState(reducer(state, action))
    }
    return <Component {...props} dispatch={dispatch} state={state} />
  }
}

const store = {
  state: {
    user: { name: 'ChenNan', age: 22 }
  },
  setState(newState: any) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [] as Array<(state?: unknown) => void>,
  subscribe(fn: () => void) {
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
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </appContext.Provider>
  )
}

const ComponentOne = () => {
  console.log('ComponentOne render')
  return (
    <section>
      组件1
      <User />
    </section>
  )
}
const ComponentTwo = () => {
  console.log('ComponentTwo render')
  return (
    <section>
      组件2
      <UserModifier />
    </section>
  )
}
const ComponentThree = () => {
  console.log('ComponentThree render')
  return <section>组件3</section>
}

const User = connect(({ state, dispatch }) => {
  console.log('User render')
  return <div>UserName: {state.user.name}</div>
})

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

const UserModifier = connect(({ dispatch, state, children }: any) => {
  console.log('UserModifier render')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateUser', payload: { name: e.target.value } })
  }

  return (
    <div>
      {children}
      <input value={state.user.name} onChange={onChange} />
    </div>
  )
})
