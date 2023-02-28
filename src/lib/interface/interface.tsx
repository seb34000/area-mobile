import typeApplication from "./typeApplication";

export interface tabBarIconProps {
    focused: boolean;
    color: string;
    size: number;
}

export interface screenOptionProps {
    route: {
        name: string;
    };
}

export interface CardProps {
    name: string;
    description: string;
}

export interface UserState {
    isLogged: boolean;
    username: string;
    email: string;
    id: number;
    token: string;
    aplications: [];
}

export interface LoginAction {
    type: "LOGIN";
    user: {
        isLogged: boolean;
        token: string;
    };
}

export interface ProfileAction {
    type: "PROFILE";
    user: {
        email: string;
        username: string;
        id: number;
        applications: typeApplication[];
    };
}

export interface LogoutAction {
    type: "LOGOUT";
    user: {
        isLogged: boolean;
        email: string;
        token: string;
    };
}

export type UserAction = LoginAction | LogoutAction;
