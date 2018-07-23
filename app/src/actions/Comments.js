import {URL, headers} from '../utils/constants'
import {GET_COMMENTS_BY_POSTID, GET_COMMENT, VOTE_COMMENT, CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../utils/constants'

export const getCommentsByPostId = (comments) => {
  return {
    type:GET_COMMENTS_BY_POSTID,
    comments
  }
}

export const fetchCommentsByPostId = (id) => (dispatch) =>{
  fetch(`${URL}/posts/${id}/comments`,
    {
      method:'GET',
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(getCommentsByPostId(data))
    })
    .catch(error => 'Error fetchCommentsByPostId: '+ error)

}

export const voteCommentAction = (data) => (dispatch) => {
  return{
    type:VOTE_COMMENT,
    data
  }
}

export const voteComment = (commentId, value) => (dispatch) => {
  const vote = {
    "option":value
  }
  return fetch(`${URL}/comments/${commentId}`,
  {
    method:'POST',
    body:JSON.stringify(vote),
    headers

  })
  .then(response => response.json())
  .then(data => {
    dispatch(voteCommentAction(data))
    return data
  })
  .catch(error =>  'Error votePost: ' + error)
}

export const getCommentAction = (comment) => {
  return{
    type:GET_COMMENT,
    commentSelected:comment
  }
}

export const getCommentSelected = (id) => (dispatch) => {
    fetch(`${URL}/comments/${id}`,{
      method:'GET',
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(getCommentAction(data))
      return data
    })
    .catch(error => 'Error getCommentSelected: ' + error)
}

export const createCommentAction = (comment) => (dispatch) => {
  return{
    type:CREATE_COMMENT,
    newComment:comment
  }
}

export const addNewComment = (newComment) => (dispatch) => {
  return fetch(`${URL}/comments`,
  {
    method:'POST',
    body:JSON.stringify(newComment),
    headers
  })
  .then(response => response.json())
  .then(data => {
    dispatch(createCommentAction(data))
    return data
  })
  .catch(error => 'Error addNewComment: ' + error)
}

export const updateAction = (comment) => (dispatch) => {
    return{
      type:EDIT_COMMENT,
      commentSelected:comment
    }
}

export const updateCommentSelected = (id, comment) => (dispatch) => {
  return fetch(`${URL}/comments/${id}`,{
    method:'PUT',
    body:JSON.stringify(comment),
    headers
  })
  .then(response => response.json())
  .then(data => {
    dispatch(updateAction(data))
    return data
  })
  .catch(error => 'Error updateCommentSelected: ' + error)
}

export const deleteCommentAction = (comment) => (dispatch) => {
  return{
    type:DELETE_COMMENT,
    commentSelected:comment
  }
}


export const deleteComment = (id) => (dispatch) => {
  return fetch(`${URL}/comments/${id}`,
    {
      method:'DELETE',
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(deleteCommentAction(data))
    })
    .catch(error => 'Error deleteComment: '+ error)
}
