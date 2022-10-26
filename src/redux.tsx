import * as React from 'react'

type A = any

const { createContext, useState, useContext, useEffect } = React

export const appContext = createContext<A>(null)

export const store = {
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

const reducer = (state: A, { type, payload }: A) => {
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

export const connect = (Component: ({ dispatch, state }: A) => JSX.Element) => {
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
