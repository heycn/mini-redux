import * as React from 'react'
import { appContext, store, connect } from './redux'

const ComponentOne = () => {
  console.log('ComponentOne render')
  return (
    <section>
      组件1
      <User />
    </section>
  )
}

const ComponentTwo = () => {
  console.log('ComponentTwo render')
  return (
    <section>
      组件2
      <UserModifier />
    </section>
  )
}

const ComponentThree = () => {
  console.log('ComponentThree render')
  return <section>组件3</section>
}

const User = connect(({ state, dispatch }) => {
  console.log('User render')
  return <div>UserName: {state.user.name}</div>
})

const UserModifier = connect(({ dispatch, state, children }: any) => {
  console.log('UserModifier render')
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
