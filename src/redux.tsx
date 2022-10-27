import * as React from 'react'

const { createContext, useState, useContext, useEffect } = React

export const appContext = createContext<any>(null)

export const store = {
  state: {
    user: { name: 'ChenNan', age: 22 },
    group: { name: '前端组' }
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

const changed = (oldState: any, newState: any) => {
  let changed = false
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true
    }
  }
  return changed
}

export const connect: (selector?: any, dispatchSelector?: any) => (fn2Arg?: any) => React.FC =
  (selector: any, dispatchSelector: any) => (Component: ({ dispatch, state }: any) => JSX.Element) => {
    return (props: any) => {
      const dispatch = (action: string) => setState(reducer(state, action))
      const { state, setState } = useContext(appContext)
      const [, update] = useState({})
      const data = selector ? selector(state) : { state }
      const dispatchers = dispatchSelector ? dispatchSelector(dispatch) : { setState }
      useEffect(() => store.subscribe(() => {
        const newData = selector ? selector(store.state) : { state: store.state }
        if (changed(data, newData)) {
          console.log('数据变化了')
          update({})
        }
      }), [selector])
      return <Component {...props} {...data} {...dispatchers} />
    }
  }
