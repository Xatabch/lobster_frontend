import * as types from './actionTypes';
import API from '../../services/API';
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => { dispatch({type: types.ENTER_LOGIN, char}) };
}

export function enterPassword(char) {
    return dispatch => { dispatch({type: types.ENTER_PASSWORD, char}) };
}

export function checkAuth() {
    return async function(dispatch) {
        const data = await API.checAuth();

        if (data.status === 200) {
            redirect('/profile');
        }
    }
}

export function signin() {
    return async function(dispatch, getState) {
        const login = getState().signin.login;
        const password = getState().signin.password;

        const data = await API.signin({login, password});

        if (data.status === 200) {
            redirect('/profile');
            dispatch({type: types.RESET_DATA});
        } else {
            dispatch({
                type: types.ERROR,
                loginError: data.username,
                passwordError: data.password
            });
        }
    }
}