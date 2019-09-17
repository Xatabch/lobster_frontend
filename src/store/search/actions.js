import * as types from './actionTypes';
// import API from '../../services/api';
import { redirect } from '../../services/helpers';

export function enterLogin(char) {
    return dispatch => {dispatch({type: types.ENTER_LOGIN, char})}
}