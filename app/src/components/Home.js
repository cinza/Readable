import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Posts from './Posts';

class Home extends Component{
  render(){
    const selectedCategory=this.props.match.params.category
    return(
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Posts category={selectedCategory} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Home
