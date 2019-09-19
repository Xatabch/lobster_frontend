import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    posts:[],
    errorText: '',
    currentPage: 1,
    postsOffset: 10
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_POSTS:
            return state.merge({
                posts: action.posts,
                currentPage: action.currentPage
            });
        case types.GET_POSTS_ERROR:
            return state.merge({
              errorText: action.errorText
            });
        default:
            return state;

    }
}

export const getPosts = state => [...state.posts.posts];

export const getError = state => state.posts.errorText;

export const getCurrentPage = state => state.posts.currentPage;