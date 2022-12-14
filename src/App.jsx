import * as React from 'react'
import { appContext, connect, store } from './redux'

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

const User = connect(state => {
  return { user: state.user }
})(({ user }) => {
  console.log('User render!')
  return <div>UserName: {user.name}</div>
})

const UserModifier = connect()(({ dispatch, state }) => {
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
