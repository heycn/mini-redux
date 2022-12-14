import React, { useState, useEffect, useContext } from 'react'
let state = void 0


const store = {
  getState() {
    return
  },
  reducer: void 0,
  setState(newState) {
    state = newState
    store.listeners.map(fn => fn(state))
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

export const createStore = (reducer, initState) => {
  state = initState
  store.reducer = reducer
  return store
}

const changed = (oldState, newState) => {
  let changed = false
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true
      break
    }
  }
  return changed
}

export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  return props => {
    const { setState } = useContext(appContext)
    const [_, forceUpdate] = useState({})
    const dispatch = action => {
      setState(store.reducer(state, action))
    }
    const selectedState = mapStateToProps ? mapStateToProps(state) : { state }
    const selectedDispatches = mapDispatchToProps ? mapDispatchToProps(dispatch) : { dispatch }
    useEffect(() => (
      store.subscribe(() => {
        const newSelectedState = mapStateToProps ? mapStateToProps(state) : { state }
        if (changed(selectedState, newSelectedState)) {
          forceUpdate({})
        }
      })
    ), [mapStateToProps])
    return <Component {...props} {...selectedState} {...selectedDispatches} />
  }
}

const appContext = React.createContext(null)

export const Provider = ({ store, children }) => {
  return (
    <appContext.Provider value={store}>
      {children}
    </appContext.Provider>
  )
}
