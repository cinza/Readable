import {
  GET_ALL_POSTS,
  FILTER,
  VOTE_POST,
  GET_POST,
  EDIT_POST,
  DELETE_POST
} from '../utils/constants'

const initialState = {
  posts:[],
  postSelected:[],
  filterType:'',
  vote:0,
}

export default function posts(state=initialState, action){
  switch (action.type) {
    case GET_ALL_POSTS:
      return{
        ...state,
        posts:action.posts
      }
    case FILTER:
      return{
        ...state,
        filterType:action.filterType
      }
    case VOTE_POST:
      return{
        ...state,
        voteScore:action.data.voteScore
      }
    case GET_POST:
      return {
        ...state,
        postSelected:action.postSelected
      }
    case EDIT_POST:
      return {
        ...state,
        postSelected:action.postSelected

      }
    case DELETE_POST:

      return{
        ...state,
        posts:state.posts.filter(p => p.id !== action.postSelected.id),
      }

    default:
      return state
  }
}
