import * as types from './actionTypes';
// import API from '../../services/api';
import { redirect } from '../../services/helpers';

export function enterText(postText) {
    return (dispatch, getState) => {
        dispatch({type: types.ENTER_TEXT, postText});
    }
}

export function uploadPhoto(form, hash) {
    return async (dispatch, getState) => {
        // 1. Добавить фото в массив с фото
        const postPhotos = [...getState().addpost.postPhotos];
        postPhotos.push(form.files[0]);

        dispatch({type: types.UPLOAD_PHOTO, postPhotos, postText: hash});
    }
}