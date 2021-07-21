const i18n_en = require("../assets/i18n/en.json")
const i18n_fr = require("../assets/i18n/fr.json")

const initialState = {
  i18n: {},
  isLoading: true,
  isLoggedIn: false,
}

function createReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'I18N_SET_LANGUAGE':
      if(action.value === "en"){
        nextState = {
          ...state,
          i18n: i18n_en
        }
      }
      else{
        nextState = {
          ...state,
          i18n: i18n_fr
        }
      }
      return nextState || state

    case 'SET_LOADING':
      nextState = {
        ...state,
        isLoading: action.value
      }
      return nextState || state

    case 'SET_LOGGED_IN':
      nextState = {
        ...state,
        isLoggedIn: action.value
      }
      return nextState || state

    default:
      return state
  }
}

export default createReducer