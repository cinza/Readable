import {URL, headers} from '../utils/constants'
import {GET_ALL_CATEGORIES} from '../utils/constants'


export const getAllCategories = (data) => {
  return{
    type:GET_ALL_CATEGORIES,
    data
  }
}

export const fetchCategories = () => (dispatch) =>{
  fetch(`${URL}/categories/`,
    {
      method:'GET',
      headers
    })
    .then(response => response.json())
    .then(data => {
      dispatch(getAllCategories(data.categories))
      return data.categories
    })
    .catch(error =>  'error ' + error)
}
