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
        const postPhotos = {...getState().addpost.postPhotos};
        postPhotos[hash] = form.files[0];

        dispatch({type: types.UPLOAD_PHOTO, postPhotos});
    }
}

export function sendPost() {
    return async (dispatch, getState) => {
        // 1. Получить введенные данные и преобразовать их в нужный вид
        const postText = [...getState().addpost.postText];
        const postPhotos = {...getState().addpost.postPhotos};

        console.log(postText, postPhotos);
        // 2. Отправить на бэк
        // 3. Если 200 ok, то redirect на profile
        // 4. В противном случае, можно вывести попап, о том, что что-то пошло не так
    }
}