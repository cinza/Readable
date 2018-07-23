//URL to reach backend
export const URL = 'http://localhost:3001';

//Headers
export const headers = {
  'Accept': 'application/json',
  'Authorization': 'readable-project',
  'Content-Type': 'application/json'
}

//categories
export const GET_ALL_CATEGORIES ='GET_ALL_CATEGORIES'

//posts
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST = 'GET_POST'
export const VOTE_POST = 'VOTE_POST'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const FILTER = 'FILTER'

//comments
export const GET_COMMENTS_BY_POSTID = 'GET_COMMENTS_BY_POSTID'
export const GET_COMMENT = 'GET_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const CREATE_COMMENT = 'CREAT_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
