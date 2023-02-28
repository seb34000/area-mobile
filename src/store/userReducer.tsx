import { UserState } from "../lib/interface/interface";

const initalState : UserState = {
    isLogged: false,
    username: '',
    email: '',
    id: -1,
    token: '',
    aplications: []
};

export default function userReducer(state: UserState = initalState, action: any) {
    switch (action.type) {
        case 'LOGIN':
            return {
                isLogged: true,
                // email: action.user.email,
                token: action.user.token
            };
        case 'LOGOUT':
            return {
                // ...state,
                // user: {}
                isLogged: false,
                username: '',
                token: '',
                email: '',
                id: -1,
                aplications: []
            };
        case 'PROFILE':
            const { isLogged, token } = state;
            return {
                isLogged: isLogged,
                email: action.user.email,
                token: token,
                username: action.user.username,
                id: action.user.id,
                aplications: action.user.applications
            };
        default:
            return state;
    }
}