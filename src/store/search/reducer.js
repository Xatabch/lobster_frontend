import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    searchLogin: '',
    foundProfiles: []
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ENTER_LOGIN:
            return state.merge({
                searchLogin: action.char
            });
        case types.SEARCH_USER:
            return state.merge({
                foundProfiles: action.foundProfiles
            })
        default:
            return state;

    }
}

export const getLogin = state => state.search.searchLogin;

export const getProfiles = state => state.search.foundProfiles;