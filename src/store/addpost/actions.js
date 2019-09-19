import * as types from './actionTypes';
import API from '../../services/API';
import { redirect } from '../../services/helpers';

export function enterText(postText) {
    return dispatch => {dispatch({type: types.ENTER_TEXT, postText})}
}

export function uploadPhoto(form, hash) {
    return async (dispatch, getState) => {
        // 1. Добавить фото в массив с фото
        const postPhotos = {...getState().addpost.postPhotos};
        const postText = [...getState().addpost.postText];
        postPhotos[hash] = form.files[0];
        postText.push(hash);

        dispatch({type: types.UPLOAD_PHOTO, postPhotos, postText});
    }
}

export function sendPost() {
    return async (dispatch, getState) => {
        // 1. Получить введенные данные и преобразовать их в нужный вид
        const postText = [...getState().addpost.postText];
        const postPhotos = {...getState().addpost.postPhotos};

        let form = new FormData();
        for(let [key, value] of Object.entries(postPhotos)){
            form.append(`${key}`, value);
        }
        
        form.append('text', JSON.stringify({...Object.values(postText)}));

        const data = await API.addPost({form});

        if (data.status === 200) {
            redirect('/profile');
        } else {

        }
        // 2. Отправить на бэк
        // 3. Если 200 ok, то redirect на profile
        // 4. В противном случае, можно вывести попап, о том, что что-то пошло не так
    }
}