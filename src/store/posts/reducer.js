import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    posts:[],
    errorText: '',
    currentPage: 1,
    postsOffset: 5,
    isNext: false
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_POSTS:
            return state.merge({
                posts: action.posts,
                currentPage: action.currentPage,
                isNext: action.isNext
            });

        case types.GET_POSTS_ERROR:
            return state.merge({
              errorText: action.errorText
            });

        case types.DELETE_POST:
            return state.merge({
                posts: action.posts
            });
            
        default:
            return state;

    }
}

export const getPosts = state => [...state.posts.posts];

export const getError = state => state.posts.errorText;

export const getCurrentPage = state => state.posts.currentPage;

export const isNext = state => state.posts.isNext;

export const isLast = state => state.posts.currentPage !== 1;

export const isEmpty = state => state.posts.posts.length === 0;