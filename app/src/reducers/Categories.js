import {
  GET_ALL_CATEGORIES,
} from '../utils/constants'


const initialState = {
  categories: [],
}

export default function categories(state = initialState, action){
  switch (action.type) {
    case GET_ALL_CATEGORIES:
        return{
          ...state,
          categories:action.data
        }
    
    default:
      return state
  }
}
