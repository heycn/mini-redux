import * as React from 'react'
import { connect, createStore, Provider } from './redux'
import { connectToUser } from './connecters/connectToUser'
import {connectToEducational} from './connecters/connectToEducational'

const reducer = (state, { type, payload }) => {
  const updateMap = {
    updateUser: {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    },
    updateEducational: {
      ...state,
      educational: {
        ...state.educational,
        ...payload
      }
    }
  }

  return updateMap[type] || state
}

const initState = {
  user: { name: '', age: '' },
  educational: { school: '', major: '' }
}
const store = createStore(reducer, initState)

const empty = string => (string ? string : '--')

export const App = () => {
  return (
    <Provider store={store}>
      <ReadData />
      <div className='flex'>
        <WriteUser />
        <WriteEducational />
      </div>
      <div className='flex'>
        <AsyncAction />
        <PromiseAction />
      </div>
    </Provider>
  )
}

const ReadData = () => {
  return (
    <section>
      <h2>读取数据</h2>
      <br />
      <AllData />
      <br />
      <h3>用户信息</h3>
      <User />
      <br />
      <h3>教育信息</h3>
      <Educational />
    </section>
  )
}

const AllData = connect()(({state}) => {
  return (
    <>
      <h3>Store</h3>
      <div>{JSON.stringify(state)}</div>
    </>
  )
})

const WriteUser = () => {
  return (
    <section>
      <h2>修改用户信息</h2>
      <br />
      <UserModifier />
    </section>
  )
}

const WriteEducational = () => {
  return (
    <section>
      <h2>修改教育信息</h2>
      <br />
      <EducationalModifier />
    </section>
  )
}

const User = connectToUser(({ user }) => {
  return (
    <>
      <div>姓名: {empty(user.name)}</div>
      <div>年龄: {empty(user.age)}</div>
    </>
  )
})

const Educational = connectToEducational(({ educational }) => {
  return (
    <>
      <div>学校: {empty(educational.school)}</div>
      <div>专业: {empty(educational.major)}</div>
    </>
  )
})

const AsyncAction = () => {
  return (
    <section>
      <h2>支持异步的 Action</h2>
      <br />
      <FetchUser />
    </section>
  )
}

const PromiseAction = () => {
  return (
    <section>
      <h2>支持 Promise 的 Action</h2>
      <br />
      <FetchPromiseUser />
    </section>
  )
}

const UserModifier = connectToUser(({ updateUser, user }) => {
  const changName = e => {
    updateUser({ name: e.target.value })
  }
  const changAge = e => {
    updateUser({ age: e.target.value })
  }
  return (
    <>
      <div>
        修改姓名
        <input maxLength={4} value={user.name} onChange={changName} />
      </div>
      <br />
      <div>
        修改年龄
        <input maxLength={3} value={user.age} onChange={changAge} />
      </div>
    </>
  )
})

const EducationalModifier = connectToEducational(({ updateEducational, educational }) => {
  const changSchool = e => {
    updateEducational({ school: e.target.value })
  }
  const changMajor = e => {
    updateEducational({ major: e.target.value })
  }
  return (
    <>
      <div>
        修改学校
        <input maxLength={5} value={educational.name} onChange={changSchool} />
      </div>
      <br />
      <div>
        修改专业
        <input maxLength={5} value={educational.age} onChange={changMajor} />
      </div>
    </>
  )
})

const ajax = url => {
  const urlMap = {
    '/user': { name: '异步的小王', age: '异步的18岁' },
    '/promiseEducational': { school: 'Promise的学校', major: 'Promise的专业' },
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: urlMap[url] })
    }, 500)
  })
}

const FetchUser = connect()(({state, dispatch}) => {
  console.log(state)
  const fetchUser = dispatch => {
    ajax('/user').then(response => {
      dispatch({ type: 'updateUser', payload: response.data })
    })
  }
  const onClick = () => {
    dispatch(fetchUser)
  }
  return <button onClick={onClick}>0.5后修改用户信息</button>
})

const FetchPromiseUser = connect(null, null)(({state, dispatch}) => {
  const fetchUserPromise = async () => {
    const response = await ajax('/promiseEducational')
    return response.data
  }
  const fetchUserPromiseFunc = async dispatch => {
    const response = await ajax('/promiseEducational')
    return dispatch({ type: 'updateEducational', payload: response.data })
  }
  const onClick = () => {
    dispatch({ type: 'updateEducational', payload: fetchUserPromise() })
    // dispatch(fetchUserPromiseFunc)
  }
  return <button onClick={onClick}>0.5秒后修改教育信息</button>
})
