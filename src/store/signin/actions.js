import * as types from './actionTypes';
// import API from '../../services/api';
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => { dispatch({type: types.ENTER_LOGIN, char}) };
}

export function checkLogin() {
    return async function(dispatch, getState) {
        // Сделать запрос за тем, существует ли такой логин, если да, то ничего не dispatch
        // если нет, то издать dispatch loginError с текстом "Пользователь не присутствует в системе"
    }
}

export function enterPassword(char) {
    return dispatch => { dispatch({type: types.ENTER_PASSWORD, char}) };
}

export function checkAuth() {
    return async function(dispatch) {
        // сделать запрос за проверкой авторизован ли я, если да, то произвести редирект
        // иначе ничего не делать
        let mockData = {
            response: 200
        }

        if (mockData === 200) {
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
        // mock
        let mockData = {
            status: 200
        }

        // 3. Если статус 200, то произвести редирект на страницу пользователя
        // иначе издать событие ошибки с ее текстом
        if (mockData.status === 200) {
            redirect('/profile');
        } else {
            // событие с текстом ошибки
        }
    }
}