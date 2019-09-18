import * as types from './actionTypes';
// import API from '../../services/api';
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => {dispatch({type: types.ENTER_LOGIN, char})}
}

export function searchUser() {
    return async (dispatch, getState) => {
        // 1. Получить имеющийся логин
        const searchLogin = getState().search.searchLogin;
        // 2. Отправить запрос с заданным логином

        const mockData = {
            status: 200,
            foundProfiles: [
                {
                    login: 'Ivan'
                }
            ]
        }

        if(mockData.status === 200) {
            // 3. dispatch(types.SEARCH_USER, user)
            dispatch({type: types.SEARCH_USER, foundProfiles: mockData.foundProfiles});
        } else {
            // 4. dispatch(ошибка)
        }
    }
}