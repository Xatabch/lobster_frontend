import * as types from './actionTypes';
import API from '../../services/API';
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => {dispatch({type: types.ENTER_LOGIN, char})}
}

export function searchUser() {
    return async (dispatch, getState) => {
        const searchLogin = getState().search.searchLogin;

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
            dispatch({type: types.SEARCH_USER, foundProfiles: proceedData.foundProfiles});
        }
    }
}