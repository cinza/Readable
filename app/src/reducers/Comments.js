import {
  GET_COMMENTS_BY_POSTID,
  VOTE_COMMENT,
  GET_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../utils/constants'

const initialState = {
  comments:[],
  commentSelected:[],
  vote:0
}

export default function comments (state=initialState, action){
  switch (action.type) {
    case GET_COMMENTS_BY_POSTID:
      return{
        ...state,
        comments:action.comments
      }

    case VOTE_COMMENT:
      return{
        ...state,
        vote:action.data.voteScore
      }

    case GET_COMMENT:
      return {
        ...state,
        commentSelected:action.commentSelected
      }

    case EDIT_COMMENT:
      return {
        ...state,
        commentSelected:action.commentSelected
      }
    case DELETE_COMMENT:
      return{
        ...state,
        comments:state.comments.filter(c => c.id !== action.commentSelected.id)
      }
    default:
      return state
  }
}
