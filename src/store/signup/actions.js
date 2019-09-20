import * as types from './actionTypes';
import API from '../../services/API'
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => { dispatch({type: types.ENTER_LOGIN, char}) };
}

export function enterEmail(char) {
    return dispatch => { dispatch({type: types.ENTER_EMAIL, char}) };
}

export function enterPassword(char) {
    return dispatch => { dispatch({type: types.ENTER_PASSWORD, char}) };
}

export function enterPasswordRepeat(char) {
    return dispatch => { dispatch({type: types.ENTER_PASSWORDREPEAT, char}) };
}

export function checkPasswordRepeat() {
    return async function(dispatch, getState) {        
        const password = getState().signup.password;
        const passwordRepeat = getState().signup.passwordRepeat;
        
        if (password !== passwordRepeat) {
            dispatch({type: types.PASSWORDREPEAT_ERROR, errorText: 'Passwords doesn\'t match'});
        } else {
            dispatch({type: types.PASSWORDREPEAT_ERROR, errorText: ''});
        }
    }
}

export function checkAuth() {
    return async function(dispatch) {
        const data = await API.checAuth();

        if (data.status === 200) {
            redirect('/profile');
        }
    }
}

export function signup() {
    return async function(dispatch, getState) {
        const login = getState().signup.login;
        const email = getState().signup.email;
        const password = getState().signup.password;
        const passwordRepeatError = getState().signup.passwordRepeatError;

        if (passwordRepeatError) {
            return;
        }

        const data = await API.signup({
            login: login,
            email: email,
            password: password
        });

        if (data.status === 201) {
            redirect('/profile');
            dispatch({type: types.RESET_DATA});
        } else {
            dispatch({
                type: types.ERROR, 
                loginError: data.errors.username,
                emailError: data.errors.email,
                passwordError: data.errors.password
            });
        }
    }
}