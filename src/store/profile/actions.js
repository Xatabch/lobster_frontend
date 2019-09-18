import * as types from './actionTypes';
import API from '../../services/API';
import { redirect, getAllUrlParams } from '../../services/helpers';

export function getUserProfile() {
    return async dispatch => { 
        // Сделать запрос на сервер за пользователем, указанным в параметрах url
        const currentURL = window.location.href;
        const URLparams = getAllUrlParams(currentURL);

        const data = await API.profile({username: URLparams.username});

        // Вид данных в котором их нужно будет вернуть с backend
        let mockData = {
            status: data.status,
            login: data.login,
            profileFollowers: data.followers,
            profileFollowing: data.following,
            profilePosts: 20,
        }

        if(mockData.status === 200) {
            dispatch({type: types.GET_USER_PROFILE, ...mockData}); 
        } else {
            // Если пользователь не найден, то перенаправаить на страничку 404
            // redirect('/notfound');
        }
    };
}