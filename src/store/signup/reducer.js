import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    login: '',
    email: '',
    password: '',
    passwordRepeat: '',
    loginError: '',
    emailError: '',
    passwordError: '',
    passwordRepeatError: '',
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ENTER_LOGIN:
            return state.merge({
                login: action.char
            });

        case types.ENTER_EMAIL:
            return state.merge({
                email: action.char
            });

        case types.ENTER_PASSWORD:
            return state.merge({
                password: action.char
            });

        case types.ENTER_PASSWORDREPEAT:
            return state.merge({
                passwordRepeat: action.char
            });

        case types.LOGIN_ERROR:
            return state.merge({
                loginError: action.errorText
            });

        case types.EMAIL_ERROR:
            return state.merge({
                emailError: action.errorText
            });
        
        case types.PASSWORD_ERROR:
            return state.merge({
                passwordError: action.errorText
            });

        case types.PASSWORDREPEAT_ERROR:
            return state.merge({
                passwordRepeatError: action.errorText
            })

        default:
            return state;

    }
}

export const getLogin = state => state.signup.login;

export const getEmail = state => state.signup.email;

export const getPassword = state => state.signup.password;

export const getPasswordRepeat = state => state.signup.passwordRepeat;

export const getLoginError = state => state.signup.loginError;

export const getEmailError = state => state.signup.emailError;

export const getPasswordError = state => state.signup.passwordError;

export const getPasswordRepeatError = state => state.signup.getPasswordRepeatError;