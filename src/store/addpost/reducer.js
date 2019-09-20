import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    postPhotos: {},
    postText: [],
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ENTER_TEXT:
            return state.merge({
                postText: action.postText
            });
        case types.UPLOAD_PHOTO:
            return state.merge({
                postPhotos: action.postPhotos,
                postText: action.postText
            })
        default:
            return state;

    }
}

export const getText = state => [...state.addpost.postText];