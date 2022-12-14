import React, { useState, useEffect, useContext } from 'react'

export const store = {
  state: {
    user: { name: 'heycn', age: 22 },
    educational: { school: 'Tsinghua University' }
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
      setState(reducer(state, action))
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
