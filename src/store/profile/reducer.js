import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    login: 'anonymus',
    profileFollowers: 0,
    profileFollowing: 0,
    profilePosts: 0,
    isMyPage: false,
    isFollow: false,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_USER_PROFILE:
            return state.merge({
                login: action.login,
                profileFollowers: action.profileFollowers,
                profileFollowing: action.profileFollowing,
                profilePosts: action.profilePosts,
                isMyPage: action.isMyPage,
                isFollow: action.isFollow,
            });
        case types.FOLLOW:
            return state.merge({
                isFollow: action.isFollow
            });
        default:
            return state;

    }
}

export const getLogin = state => state.profile.login;

export const getFollowers = state => state.profile.profileFollowers;

export const getFollowing = state => state.profile.profileFollowing;

export const getPosts = state => state.profile.profilePosts;

export const isMyPage = state => state.profile.isMyPage;

export const isFollow = state => state.profile.isFollow;