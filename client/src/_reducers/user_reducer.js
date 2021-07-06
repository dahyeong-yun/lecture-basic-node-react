import {
    LOGIN_USER,
    REGISTER_USER
} from '../_actions/types'

export default function(state = {}, action) { // TODO payload라는 단어의 뜻은? action의 값은 어떻게 들어오는 것인지?
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break
        case REGISTER_USER:
            return { ...state, register: action.payload}
            break
        default:
            return state
    }
}