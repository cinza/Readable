import { combineReducers } from 'redux'
import categories from './Categories'
import posts from './Posts'
import comments  from './Comments'

export default combineReducers({
  categories,
  posts,
  comments
})
