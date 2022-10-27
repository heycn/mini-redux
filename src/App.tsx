import * as React from 'react'
import { appContext, store, connect } from './redux'

const ComponentOne = () => {
  return (
    <section>
      组件1
      <User />
    </section>
  )
}

const ComponentTwo = () => {
  return (
    <section>
      组件2
      <UserModifier />
    </section>
  )
}

const ComponentThree = connect((state: any) => {
  return { group: state.group }
})(({ group }: any) => {
  console.log('组件3重新渲染')
  return (
    <section>
      组件3
      <div>Group: {group.name} </div>
    </section>
  )
})

const User: any = connect((state: any) => {
  return { user: state.user }
})(({ user }: any) => {
  return <div>UserName: {user.name}</div>
})

const UserModifier = connect(null, (dispatch: any) => {
  return {
    updateUser: (attrs: any) => dispatch({ type: 'updateUser', payload: attrs })
  }
})(({ updateUser, state, children }: any) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({ name: e.target.value })
  }

  return (
    <>
      {children}
      <input value={state.user.name} onChange={onChange} />
    </>
  )
})

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </appContext.Provider>
  )
}
