import { connect } from '../redux'

const userSelector = state => {
  return { user: state.user }
}

const userDispatches = dispatch => {
  return {
    updateUser: attrs => dispatch({ type: 'updateUser', payload: attrs })
  }
}

export const connectToUser = connect(userSelector, userDispatches)
