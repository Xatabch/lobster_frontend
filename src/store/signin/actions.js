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
        // Cделать запрос за проверкой авторизован ли я, если да, то произвести редирект
        // иначе ничего не делать

        const data = await API.checAuth();

        if (data.status === 200) {
            redirect('/profile');
        }
    }
}

export function signin() {
    return async function(dispatch, getState) {
        // 1. Получить данные состояния
        const login = getState().signin.login;
        const password = getState().signin.password;

        // 2. Сделать запрос с этими данными
        const data = await API.signin({login, password});

        // 3. Если статус 200, то произвести редирект на страницу пользователя
        // иначе издать событие ошибки с ее текстом
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