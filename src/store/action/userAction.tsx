import {
    LoginAction,
    LogoutAction,
    ProfileAction,
} from "../../lib/interface/interface";
import typeApplication from "../../lib/interface/typeApplication";

export function login(token: string): LoginAction {
    return {
        type: "LOGIN",
        user: {
            isLogged: true,
            token: token,
        },
    };
}

export function logout(): LogoutAction {
    return {
        type: "LOGOUT",
        user: {
            isLogged: false,
            email: "",
            token: "",
        },
    };
}

export function profile(
    email: string,
    username: string,
    id: number,
    application: typeApplication[]
): ProfileAction {
    return {
        type: "PROFILE",
        user: {
            email: email,
            username: username,
            id: id,
            applications: application,
        },
    };
}
