import { connect } from '../redux'

const educationalSelector = state => {
  return { educational: state.educational }
}

const educationalDispatches = dispatch => {
  return {
    updateEducational: attrs => dispatch({ type: 'updateEducational', payload: attrs })
  }
}

export const connectToEducational = connect(educationalSelector, educationalDispatches)
