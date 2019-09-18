import * as types from './actionTypes';
import API from '../../services/API'
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => { dispatch({type: types.ENTER_LOGIN, char}) };
}

export function checkLogin() {
    return async function(dispatch, getState) {
        // Сделать запрос за тем, существует ли такой логин, если да, то dispatch LOGIN_ERROR с текстом "Пользователь присутствует в системе"
        // если нет, то издать dispatch LOGIN_ERROR с пустым текстом
    }
}

export function enterEmail(char) {
    return dispatch => { dispatch({type: types.ENTER_EMAIL, char}) };
}

export function checkEmail() {
    return async function(dispatch, getState) {
        // Проверить с помощью регулярного выражения подходит ли введенная комбинация email
        // если да, то издать событие EMAIL_ERROR с пустым текстом, если нет, то издать событие EMAIL_ERROR 
        // c "Неверно введен email"
    }
}

export function enterPassword(char) {
    return dispatch => { dispatch({type: types.ENTER_PASSWORD, char}) };
}

export function checkPassword() {
    return async function(dispatch, getState) {
        // Проверить количество символов в пароле, если все ок, то ничего dispatch PASSWORD_ERROR с пустым текстом
        // в противном случае dispatch PASSWORD_ERROR с текстом "Слишком короткая комбинация" (например)
    }
}

export function enterPasswordRepeat(char) {
    return dispatch => { dispatch({type: types.ENTER_PASSWORDREPEAT, char}) };
}

export function checkPasswordRepeat() {
    return async function(dispatch, getState) {
        // Проверить совпадают ли пароли и если нет dispatch PASSWORDREPEAT_ERROR, что пароли не совпадают,
        // в противном случае dispatch PASSWORDREPEAT_ERROR с пустым текстом
    }
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

export function signup() {
    return async function(dispatch, getState) {
        // 1. Получить данные состояния
        const login = getState().signup.login;
        const email = getState().signup.email;
        const password = getState().signup.password;

        // 1.1 проверить нет ли ошибок с совпадением паролей, логином или email если нет, то отправить запрос
        // если есть то, не отправлять
        const loginError = getState().signup.loginError;
        const emailError = getState().signup.emailError;
        const passwordError = getState().signup.passwordError;

        if (loginError || emailError || passwordError) {
            return;
        }

        // 2. Сделать запрос с этими данными
        const testData = await API.signup({
            login: 'test7',
            email: 'test7@mail.ru',
            password: '12345678' 
        });

        // mock
        let mockData = {
            status: 200
        }

        // 3. Если статус 200, то произвести редирект на страницу пользователя
        // иначе издать событие ошибки с ее текстом
        if (mockData.status === 200) {
            redirect('/profile');
        } else {
            // событие с текстом ошибки, которая пришла с бэка
        }
    }
}