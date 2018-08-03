import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchPosts, fetchAllPosts, filterBy} from '../actions/Posts';
import Grid from '@material-ui/core/Grid';
import PostCard from './PostCard'
import Typography from '@material-ui/core/Typography';
import DateRange from '@material-ui/icons/DateRange';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  title:{
    padding: '0 20px',
    width:'auto',
    display:'inline-flex'
  },
  items:{
     margin: theme.spacing.unit,
     paddingLeft:20,
     display:'block'
  },
  button: {
   margin: theme.spacing.unit,
 },
 buttonRight:{
   float:'right',
   margin: theme.spacing.unit,
 }
});


class Posts extends Component{

  componentWillMount(){

    let {category} = this.props
    if(category === undefined || category === 'all'){
      this.props.fetchAllPosts()
    }else{
      this.props.fetchPosts(category)
    }

  }

  sortBy(posts,value){
    return posts.sort((x,y) => {
      return x[value] < y[value]
    })
  }

  filterPost(type){
    this.props.filterBy(type)
  }


  render(){
    const {posts, classes} = this.props
    console.log("PROPS POSTS", this.props)
    let {filterType} = this.props
    if(filterType === ''){
       filterType = 'voteScore'
    }

    const filteredPosts = this.sortBy(posts, filterType)


    return(
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper elevation={4}>
                <Typography  className={classes.title}>
                  Filter by:
                </Typography>
                <Button className={classes.button} key="date" variant="contained" color="default" onClick={() => this.filterPost('timestamp')}>
                  Date
                  <DateRange>send</DateRange>
                </Button>
                <Button  className={classes.button} key="vote" variant="contained" color="default"  onClick={() => this.filterPost('voteScore')} >
                  Vote Score
                </Button>
                <Button className={classes.buttonRight}  key="new" variant="contained" color="secondary" href="/posts/new">
                  New Post
                </Button>
              </Paper>
          </Grid>

          {filteredPosts ?
            (
              filteredPosts.map((post) => {
                return <PostCard  key={post.id} post={post}/>
          })
          ):(
            <Typography >
              No Posts to show
            </Typography>
          )}

        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    filterType:state.posts.filterType,
  }
}

export default connect(mapStateToProps, {fetchPosts, fetchAllPosts, filterBy})(withStyles(styles)(Posts));
