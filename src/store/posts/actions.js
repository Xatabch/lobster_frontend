import * as types from './actionTypes';
import API from '../../services/API';
import { redirect, getAllUrlParams } from '../../services/helpers';

export function getPosts(direction) {
    return async (dispatch, getState) => {
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
            nextPage = direction === 'right' ? 
                             currentPage + 1 : 
                             currentPage > 1 ? 
                             currentPage - 1 : 
                             1; 
        }
        
        let data;
        if (URLparams.username) {
            data = await API.getPosts({page: nextPage, offset: postsOffset, username: URLparams.username});
        } else {
            data = await API.getPosts({page: nextPage, offset: postsOffset});
        }
        
        
        if (data.posts.length === 0 && nextPage != 1) {
            redirect(`/posts?page=1${URLparams.username ? `&username=${URLparams.username}` : ''}`);
            return;
        }

        const processData = data.posts.map(post => {
            return {
                id: post.id,
                author: post.author,
                text: Object.values(JSON.parse(post.text)),
                publishDate: new Date(post.create_date),
                photos: post.photos,
                isMyPost: post.isMyPost || false
            }
        });

        if(data.status === 200) {
            redirect(`/posts?page=${nextPage}${URLparams.username ? `&username=${URLparams.username}` : ''}`);
            dispatch({type: types.GET_POSTS, posts: processData, currentPage: nextPage});
        }
    }
}

export function deletePost(id) {
    return async (dispatch, getState) => {
        const posts = [...getState().posts.posts];
        const data = await API.deletePost({id});

        const newPosts = posts.filter(post => post.id !== id);

        if (data.status === 200) {
            dispatch({type: types.DELETE_POST, posts: newPosts});
        }
    }
}