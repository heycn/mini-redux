import * as React from 'react'
import { appContext, connect, store } from './redux'
import { connectToUser } from './connecters/connectToUser'

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
