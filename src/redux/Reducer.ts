import { User } from "../api/types/user"
import { i18n_en } from "../assets/i18n/i18n_en"
import { i18n_fr } from "../assets/i18n/i18n_fr"

// IS LOGGED IN = 0: Non défini | 1: Accès refusé | 2: Accès autorisé
const initialState = {
  i18n: i18n_fr,
  isLoading: true,
  isLoggedIn: 0,
  user: {} as User,
}

const createReducer = (state = initialState, action: any) => {
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

    case 'SET_LOGGEDIN':
      nextState = {
        ...state,
        isLoggedIn: action.value
      }
      return nextState || state

    case 'SET_USER':
      nextState = {
        ...state,
        user: action.value
      }
      return nextState || state

    default:
      return state
  }
}

export default createReducer
