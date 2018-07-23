import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {votePost, fetchAllPosts, getPostSelected, deletePost} from '../actions/Posts';
import {voteComment, fetchCommentsByPostId, deleteComment} from '../actions/Comments';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

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

class Settings extends Component{

  vote(value, id){

    const {typeElement} = this.props
    if(typeElement === 'post'){
        this.props.votePost(id, value)
        .then(() => this.props.fetchAllPosts())
        .then(() => this.props.getPostSelected(id))

    }

    if(typeElement === 'comment'){
      const {parentId} = this.props.elementValue
      this.props.voteComment(id, value)
      .then(() => this.props.fetchCommentsByPostId(parentId))

    }
  }

  remove(id, parentId){
    const {typeElement} = this.props

    if(typeElement === 'post'){
      this.props.deletePost(id)
      .then(() => this.props.fetchAllPosts())
      .then(() => this.props.getPostSelected(id))
    }

    if(typeElement === 'comment'){
      const {parentId} = this.props.elementValue
      this.props.deleteComment(id)
      .then(() => this.props.fetchCommentsByPostId(parentId))
      .then(() => this.props.getPostSelected(parentId))
    }
  }
  render() {
      let {elementValue} = this.props
      const {classes, typeElement} = this.props

      return(
        <div>
          <Badge badgeContent={elementValue.voteScore} color="primary">
            <FavoriteIcon />
         </Badge>
          <IconButton aria-label="Like!" onClick={() => this.vote("upVote", elementValue.id)}>
            <ThumbUp/>
          </IconButton>
          <IconButton aria-label="Unlike!"  onClick={() => this.vote("downVote", elementValue.id)}>
            <ThumbDown/>
          </IconButton>
          <IconButton aria-label="delete" className={classes.button}  onClick={() => this.remove(elementValue.id)}>
             <DeleteIcon />
           </IconButton>
           <IconButton  aria-label="edit" className={classes.button} href={`/edit/${typeElement}/${elementValue.id}`}>
             <Edit/>
            </IconButton>
        </div>
      )
  }
}


const mapStateToProps = (state) => {
  return{
    posts: state.posts,
    vote: state.vote,
    comments: state.comments
  }
};



export default connect(mapStateToProps,{votePost, fetchAllPosts, getPostSelected, deletePost, voteComment, fetchCommentsByPostId,deleteComment})(withStyles(styles)(Settings))
