import * as types from './actionTypes';
import API from '../../services/API';
import { redirect, getAllUrlParams } from '../../services/helpers';

export function getUserProfile() {
    return async dispatch => { 
        const currentURL = window.location.href;
        const URLparams = getAllUrlParams(currentURL);

        const data = await API.profile({username: URLparams.username});

        if(!URLparams.username && data.login) {
            redirect(`/profile?username=${data.login}`);
        }

        const proceedData = {
            status: data.status,
            login: data.login,
            profileFollowers: data.followers,
            profileFollowing: data.following,
            isMyPage: data.isMyPage,
            isFollow: data.isFollow,
            profilePosts: data.posts,
        }

        if(proceedData.status === 200) {
            dispatch({type: types.GET_USER_PROFILE, ...proceedData}); 
        }
    };
}

export function follow() {
    return async (dispatch, getState) => {
        const isFollow = getState().profile.isFollow;
        const profileFollowers = getState().profile.profileFollowers;
        const login = getState().profile.login;

        let data;
        let newProfileFollowers;
        
        if (isFollow) {
            data = await API.unfollow({username: login});
            newProfileFollowers = profileFollowers - 1;
        } else {
            data = await API.follow({username: login});
            newProfileFollowers = profileFollowers + 1;
        }
        
        if (data.status === 200) {
            dispatch({type: types.FOLLOW, isFollow: !isFollow, profileFollowers: newProfileFollowers});
        } else {
            dispatch({type: types.FOLLOW, isFollow: isFollow});
        }
    }
}

export function logout() {
    return async () => {
        const data = await API.logout();

        if (data.status === 200) {
            redirect('/signin');
        }
    }
}