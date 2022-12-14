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
    </Provider>
  )
}

// Brother 用于展示 User 数据
const Brother = () => {
  console.log('Brother render!')
  return (
    <section>
      <h1>Brother</h1>
      <User />
    </section>
  )
}

// Sister 用于修改 User 数据
const Sister = () => {
  console.log('Sister render!')
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
  console.log('Cousin render!')
  return (
    <section>
      <h1>Cousin</h1>
      <div>educational: {educational.school}</div>
    </section>
  )
})

const AsyncUser = () => {
  console.log('AsyncUser render!')
  return (
    <section>
      <h1>AsyncUser</h1>
      <FetchUser />
    </section>
  )
}

const User = connectToUser(({ user }) => {
  console.log('User render!')
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
        resolve({ name: '异步的小王', age: 999 })
      }, 500)
    })
}
const fetchUser = dispatch => {
  ajax('/user').then(response => {
    dispatch({ type: 'updateUser', payload: response })
  })
}

const FetchUser = connect(null, null)(({state, dispatch}) => {
  console.log('AsyncUser render!')
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
