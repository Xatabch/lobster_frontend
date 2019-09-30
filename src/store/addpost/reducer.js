import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    postPhotos: {},
    postText: [],
    isSend: false
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
            });

        case types.SEND_POST:
            return state.merge({
                isSend: action.isSend
            });

        default:
            return state;

    }
}

export const getText = state => [...state.addpost.postText];

export const isSend = state => state.addpost.isSend;