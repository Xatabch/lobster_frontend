import * as types from './actionTypes';
import API from '../../services/API';
import { redirect, getAllUrlParams } from '../../services/helpers';

export function getPosts(direction) {
    return async (dispatch, getState) => {

        // 1. Проанализировать URL, если там нет параметра page, то нужно его добавить, по умолчанию page=1
        // Обработать page и direction
        const currentPage = getState().posts.currentPage;
        const postsOffset = getState().posts.postsOffset;
        const currentURL = window.location.href;
        const URLparams = getAllUrlParams(currentURL);
        let nextPage = 1;

        if (!direction) {
            if(!URLparams.page) {
                redirect('/posts?page=1');
            }
        } else {
            // изменение страницы в зависимости от направления
            nextPage = direction === 'right' ? 
                             currentPage + 1 : 
                             currentPage > 0 ? 
                             currentPage - 1 : 
                             0; 
        }
        
        let data;
        if (URLparams.username) {
            data = await API.getPosts({page: nextPage, offset: postsOffset, username: URLparams.username});
        } else {
            data = await API.getPosts({page: nextPage, offset: postsOffset});
        }

        const processData = data.posts.map(post => {
            return {
                id: post.id,
                author: post.author,
                text: Object.values(JSON.parse(post.text)),
                photos: post.photos,
                isMyPost: post.isMyPost || false
            }
        });

        console.log(processData);
        // 2. Сделать GET запрос на сервер, согласно параметрам страницы
        // 3. Преобразовать данные, если это необходимо нужный вид

        // 4. Если все прошло успешно, то dispatch(types.GET_POSTS, posts, currentPage(согласно параметрам URL))
        if(data.status === 200) {
            redirect(`/posts?page=${nextPage}${URLparams.username ? `&username=${URLparams.username}` : ''}`);
            dispatch({type: types.GET_POSTS, posts: processData, currentPage: nextPage});
        } else {
            // 5. Если запрос прошел неудачно, dispatch(types.GET_POSTS_ERROR, errorText), и вывести в соотв. месте на странице
        }
    }
}

export function deletePost(id) {
    return async (dispatch, getState) => {
        // 1. Сделать DELETE запрос с переданным id
        const posts = [...getState().posts.posts];
        const data = await API.deletePost({id});

        const newPosts = posts.filter(post => post.id !== id);

        if (data.status === 200) {
            dispatch({type: types.DELETE_POST, posts: newPosts});
        }
    }
}