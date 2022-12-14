import React, { useState, useEffect, useContext } from 'react'

let state = void 0
let reducer = void 0
let listeners = []
const setState = newState => {
  state = newState
  listeners.map(fn => fn(state))
}

const store = {
  getState() {
    return
  },
  dispatch: action => {
    setState(reducer(state, action))
  },
  subscribe(fn) {
    listeners.push(fn)
    return () => {
      const index = listeners.indexOf(fn)
      listeners.splice(index, 1)
    }
  }
}

const { dispatch }= store

export const createStore = (_reducer, initState) => {
  state = initState
  reducer = _reducer
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
    const [_, forceUpdate] = useState({})
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
