import {URL, headers} from '../utils/constants'
import {GET_ALL_POSTS,GET_POST, VOTE_POST,CREATE_POST, EDIT_POST, DELETE_POST, FILTER} from '../utils/constants'


export const getAllPosts = (posts) => {
  return{
    type:GET_ALL_POSTS,
    posts
  }
}

export const fetchPosts = (category) => (dispatch) =>{
  fetch(`${URL}/${category}/posts`,
    {
      method:'GET',
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(getAllPosts(data))
      return data
    })
    .catch(error =>  'Error FetchAllPosts: ' + error)
}


export const fetchAllPosts = () => (dispatch) =>{
  fetch(`${URL}/posts`,
  {
    method:'GET',
    headers
  })
  .then(response => response.json())
  .then(data => {
    dispatch(getAllPosts(data))
  })
  .catch(error =>  'Error fetchAllPosts: ' + error)
}

export const getPostAction = (post) => {
  return{
    type:GET_POST,
    postSelected:post
  }
}

export const getPostSelected = (id) => (dispatch) => {
  fetch(`${URL}/posts/${id}`,
    {
      method:'GET',
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(getPostAction(data))
      return data
    })
    .catch(error => 'Error getPost: ' + error)
}

export const filterBy = (type) => (dispatch) => {
  dispatch({
    type:FILTER,
    filterType:type,
  })
}

export const votePostAction = (data) => (dispatch) => {
  return{
    type:VOTE_POST,
    data
  }
}

export const votePost = (postId, value) => (dispatch) => {
  const vote = {
    "option":value
  }
  return fetch(`${URL}/posts/${postId}`,
  {
    method:'POST',
    body:JSON.stringify(vote),
    headers

  })
  .then(response => response.json())
  .then(data => {
    dispatch(votePostAction(data))
    return data
  })
  .catch(error =>  'Error votePost: ' + error)
}

export const createPostAction = (post) => (dispatch) => {
    return{
      type:CREATE_POST,
      newPost:post
    }
}

export const addNewPost = (newPost) => (dispatch) => {
  return fetch(`${URL}/posts`,
    {
      method:'POST',
      body:JSON.stringify(newPost),
      headers,

  })
  .then(response => response.json)
  .then(data => {
    dispatch(createPostAction(data))
    return data
  })
  .catch(error => 'Error addNewPost: ' + error)

}

export const updateAction = (post) => (dispatch) => {
  return{
    type:EDIT_POST,
    postSelected:post
  }
}

export const updatePostSelected = (id, post) => (dispatch) => {
  return fetch(`${URL}/posts/${id}`,
    {
      method:'PUT',
      body:JSON.stringify(post),
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(updateAction(data))
      return data
    })
    .catch(error => 'Error updatePostSelected: ' + error)
}

export const deleteAction = (post) => (dispatch) => {
  return{
    type:DELETE_POST,
    postSelected:post
  }
}

export const deletePost = (id) => (dispatch) => {
  return fetch(`${URL}/posts/${id}`,
    {
      method:'DELETE',
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(deleteAction(data))
    })
    .catch(error =>  'Error votePost: ' + error)
}
