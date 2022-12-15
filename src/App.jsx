import * as React from 'react'
import { connect, createStore, Provider } from './redux'
import { connectToUser } from './connecters/connectToUser'

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
const initState = {
  user: { name: 'heycn', age: 22 },
  educational: { school: 'Tsinghua University' }
}
const store = createStore(reducer, initState)

export const App = () => {
  return (
    <Provider store={store}>
      <Brother />
      <Sister />
      <Cousin />
      <AsyncUser />
      <PromiseUser />
    </Provider>
  )
}

// Brother 用于展示 User 数据
const Brother = () => {
  return (
    <section>
      <h1>Brother</h1>
      <User />
    </section>
  )
}

// Sister 用于修改 User 数据
const Sister = () => {
  return (
    <section>
      <h1>Sister</h1>
      <UserModifier />
    </section>
  )
}

const Cousin = connect(state => {
  return { educational: state.educational }
})(({ educational }) => {
  return (
    <section>
      <h1>Cousin</h1>
      <div>educational: {educational.school}</div>
    </section>
  )
})

const AsyncUser = () => {
  return (
    <section>
      <h1>AsyncUser</h1>
      <FetchUser />
    </section>
  )
}

const PromiseUser = () => {
  return (
    <section>
      <h1>PromiseUser</h1>
      <FetchPromiseUser />
    </section>
  )
}

const User = connectToUser(({ user }) => {
  return <div>UserName: {user.name}</div>
})

const UserModifier = connectToUser(({ updateUser, user }) => {
  const onChange = e => {
    updateUser({ name: e.target.value })
  }
  console.log('UserModifier render!')
  return (
    <div>
      <input value={user.name} onChange={onChange} />
    </div>
  )
})

const ajax = url => {
  if (url === '/user')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { name: '异步的小王', age: 99 } })
      }, 500)
    })
  if (url === '/promiseUser')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { name: 'Promise的小王', age: 99 } })
      }, 500)
    })
}

const FetchUser = connect(null, null)(({state, dispatch}) => {
  const fetchUser = dispatch => {
    ajax('/user').then(response => {
      dispatch({ type: 'updateUser', payload: response.data })
    })
  }
  const onClick = () => {
    dispatch(fetchUser)
  }
  return (
    <div>
      <div>UserName: {state.user.name}</div>
      <button onClick={onClick}>fetchUser</button>
    </div>
  )
})

const FetchPromiseUser = connect(null, null)(({state, dispatch}) => {
  const fetchUserPromise = async () => {
    const response = await ajax('/promiseUser')
    return response.data
  }
  const fetchUserPromiseFunc = async dispatch => {
    const response = await ajax('/promiseUser')
    return dispatch({ type: 'updateUser', payload: response.data })
  }
  const onClick = () => {
    dispatch({ type: 'updateUser', payload: fetchUserPromise() })
    // dispatch(fetchUserPromiseFunc)
  }
  return (
    <div>
      <div>UserName: {state.user.name}</div>
      <button onClick={onClick}>fetchUser</button>
    </div>
  )
})
