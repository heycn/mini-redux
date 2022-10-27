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

const ComponentThree = () => {
  return <section>组件3</section>
}

const User: any = connect((state: any) => {
  return { user: state.user }
})(({ user }: any) => {
  return <div>UserName: {user.name}</div>
})

const UserModifier = connect()(({ dispatch, state, children }: any) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateUser', payload: { name: e.target.value } })
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
