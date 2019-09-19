import * as types from './actionTypes';
import API from '../../services/API';
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => {dispatch({type: types.ENTER_LOGIN, char})}
}

export function searchUser() {
    return async (dispatch, getState) => {
        // 1. Получить имеющийся логин
        const searchLogin = getState().search.searchLogin;
        // 2. Отправить запрос с заданным логином

        const data = await API.profile({
            username: searchLogin
        })

        const proceedData = {
            status: data.status,
            foundProfiles: [
                {
                    login: data.login
                }
            ]
        }

        if(proceedData.status === 200) {
            // 3. dispatch(types.SEARCH_USER, user)
            dispatch({type: types.SEARCH_USER, foundProfiles: proceedData.foundProfiles});
        } else {
            // 4. dispatch(ошибка)
        }
    }
}