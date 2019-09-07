import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    login: '',
    password: '',
    loginError: '',
    passwordError: ''
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ENTER_LOGIN:
            return state.merge({
                login: action.char
            });

        case types.ENTER_PASSWORD:
            return state.merge({
                password: action.char
            });

        case types.LOGIN_ERROR:
            return state.merge({
                loginError: action.errorText
            });
        
        case types.PASSWORD_ERROR:
            return state.merge({
                passwordError: action.errorText
            })

        default:
            return state;

    }
}

export const getLogin = state => state.signin.login;

export const getPassword = state => state.signin.password;

export const getLoginError = state => state.signin.loginError;

export const getPasswordError = state => state.signin.passwordError;