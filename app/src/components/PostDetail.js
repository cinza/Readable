import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Settings from './Settings';
import AddComment from './AddComment';
import {getPostSelected} from '../actions/Posts';
import {fetchCommentsByPostId} from '../actions/Comments';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';



const styles = theme => ({
  root: {

    flexWrap: 'wrap',
  },
  items:{
     display:'block',
     paddingTop:15
  },
  formControl: {
    margin: theme.spacing.unit,
    width:'100%',
    display:'block'
  },
  textField:{
    width:'100%',
  },
  wrapper:{
    marginTop:30,
    padding:15
  },
  comment:{
    background:'#F5F5F5'
  },
  divider:{
    marginTop:30
    }
});


class PostDetail extends Component{

  componentDidMount(){
      const {postId} = this.props.match.params
      this.props.getPostSelected(postId)
      this.props.fetchCommentsByPostId(postId)

  }


  validate = () => {
    if((this.state.author !== '') || (this.state.category !== '') || (this.state.title !== '') || (this.state.body !== '')){
      return true;
    }
    return false;
  }

  render(){
    const {post, comments, classes} = this.props

    return(
      <div>
        <Grid  container spacing={24}   alignItems='center' justify='center'>
          <Grid item  xs={10}>
            {post && post.title ? (
              <Card className={classes.wrapper}>
                <CardHeader
                  title={post.title}
                  subheader={`writen by : ${post.author}`}
                />
                <CardContent>
                  <Typography component="p">
                    {post.body}
                    <span className={classes.items}>Comments: {post.commentCount} </span>

                  </Typography>

                  <CardActions className={classes.actions} disableActionSpacing>
                    <Settings elementValue={post} typeElement={'post'}/>
                  </CardActions>
                  <Divider />

                   {comments && comments.map(comment => {
                     return (
                       <CardContent key={comment.id} className={classes.comment}>

                         <Typography paragraph variant="title" gutterBottom>
                           {comment.author}
                         </Typography>
                         <Typography>
                           {comment.body}
                         </Typography>
                         <FormControl className={classes.formControl}>
                          <Settings elementValue={comment} typeElement={'comment'}/>
                         </FormControl>
                         <Divider className={classes.divider} />
                       </CardContent>
                     )
                   })
                 }
                 <AddComment parentId={post.id}/>
                </CardContent>

              </Card>
            ):(
              <Card>
                <CardHeader title="Post not found" />
              </Card>
            )}

          </Grid>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    post: state.posts.postSelected,
    comments: state.comments.comments
  }
};

export default connect(mapStateToProps,{getPostSelected, fetchCommentsByPostId})(withStyles(styles)(PostDetail))
