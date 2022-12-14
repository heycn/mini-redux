import React, { useState, useEffect, useContext } from 'react'

const store = {
  state: void 0,
  reducer: void 0,
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

export const createStore = (reducer, initState) => {
  store.state = initState
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
    const { state, setState } = useContext(appContext)
    const [_, forceUpdate] = useState({})
    const dispatch = action => {
      setState(store.reducer(state, action))
    }
    const selectedState = mapStateToProps ? mapStateToProps(state) : { state }
    const selectedDispatches = mapDispatchToProps ? mapDispatchToProps(dispatch) : { dispatch }
    useEffect(() => (
      store.subscribe(() => {
        const newSelectedState = mapStateToProps ? mapStateToProps(store.state) : { state: store.state }
        if (changed(selectedState, newSelectedState)) {
          forceUpdate({})
        }
      })
    ), [mapStateToProps])
    return <Component {...props} {...selectedState} {...selectedDispatches} />
  }
}

export const appContext = React.createContext(null)
