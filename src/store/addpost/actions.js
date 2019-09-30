import * as types from './actionTypes';
import API from '../../services/API';
import { redirect } from '../../services/helpers';

export function enterText(postText) {
    return dispatch => {dispatch({type: types.ENTER_TEXT, postText})}
}

export function uploadPhoto(form, hash) {
    return async (dispatch, getState) => {
        const postPhotos = {...getState().addpost.postPhotos};
        const postText = [...getState().addpost.postText];
        postPhotos[hash] = form.files[0];
        postText.push(hash);

        dispatch({type: types.UPLOAD_PHOTO, postPhotos, postText});
    }
}

export function sendPost() {
    return async (dispatch, getState) => {
        const postText = [...getState().addpost.postText];
        const postPhotos = {...getState().addpost.postPhotos};

        if (!postText.length && !postPhotos.length) {
            return;
        }

        let form = new FormData();
        for(let [key, value] of Object.entries(postPhotos)){
            form.append(`${key}`, value);
        }
        
        form.append('text', JSON.stringify({...Object.values(postText)}));

        dispatch({type: types.SEND_POST, isSend: true});
        const data = await API.addPost({form});

        if (data.status === 201) {
            dispatch({type: types.SEND_POST, isSend: false});
            redirect('/profile');
        }
    }
}