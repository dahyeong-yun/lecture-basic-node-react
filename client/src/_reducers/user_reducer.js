import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'

export default function(state = {}, action) { // payload라는 단어의 뜻은? action의 값은 어떻게 들어오는 것인지? -> user_action에서 오고 있음
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return { ...state, register: action.payload}
        case AUTH_USER:
            return { ...state, userData: action.payload}
        default:
            return state
    }
}