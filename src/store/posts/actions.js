import * as types from './actionTypes';
// import API from '../../services/api';
import { redirect, getAllUrlParams } from '../../services/helpers';

export function getPosts(direction) {
    return async (dispatch, getState) => {

        // 1. Проанализировать URL, если там нет параметра page, то нужно его добавить, по умолчанию page=1
        // Обработать page и direction
        const currentPage = getState().posts.currentPage;
        let nextPage = 1;

        if (!direction) {
            const currentURL = window.location.href;
            const URLparams = getAllUrlParams(currentURL);

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

        // 2. Сделать GET запрос на сервер, согласно параметрам страницы
        // 3. Преобразовать данные, если это необходимо нужный вид
        const mockData = {
            status: 200,
            posts: [
                {
                    id: 1,
                    author: 'Ivan',
                    publishDate: '16.09.2019',
                    title: 'Hello, world',
                    likes: 10,
                    isLike: false,
                    text: ['This is story about how I make light analog of my lovely SN Medium', 'Hsjru83J_', 'Before that was photo'],
                    // photos: {}
                    photos: {'Hsjru83J_': 'https://elena-iv-skaya.cdn.prismic.io/elena-iv-skaya/53b06fa549e3215ffc475c750fb03f60915c4dee_la-dolce-vita-cover.jpg'}
                },
                {
                    id: 2,
                    author: 'Michal',
                    publishDate: '16.09.2019',
                    title: 'Hello, world 2.0',
                    likes: 10,
                    isLike: false,
                    text: ['This is story about how I make light analog of my lovely SN Medium', 'Hsjru83J_', 'Before that was photo'],
                    // photos: {}
                    photos: {'Hsjru83J_': 'https://elena-iv-skaya.cdn.prismic.io/elena-iv-skaya/febd1d5f15d450ad35eb04735ce698d9e13ff244_bokaap-cover-.jpg'}
                }
            ]
        }

        // 4. Если все прошло успешно, то dispatch(types.GET_POSTS, posts, currentPage(согласно параметрам URL))
        if(mockData.status === 200) {
            dispatch({type: types.GET_POSTS, posts: mockData.posts, currentPage: nextPage});
        } else {
            // 5. Если запрос прошел неудачно, dispatch(types.GET_POSTS_ERROR, errorText), и вывести в соотв. месте на странице
        }
    }
}