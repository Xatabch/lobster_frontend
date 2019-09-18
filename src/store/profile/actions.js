import * as types from './actionTypes';
// import API from '../../services/api';
import { redirect } from '../../services/helpers';

export function getUserProfile() {
    return async dispatch => { 
        // Сделать запрос на сервер за пользователем, указанным в параметрах url


        // Вид данных в котором их нужно будет вернуть с backend
        let mockData = {
            status: 200,
            login: 'neiron',
            profileFollowers: 128,
            profileFollowing: 33,
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