import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import uniqid from 'uniqid';
import {addNewComment, fetchCommentsByPostId} from '../actions/Comments';
import {getPostSelected} from '../actions/Posts';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width:'100%',
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

const handleValidation = (author, body) => {
  const errorsMessage = []

  if(author.length === 0){
    errorsMessage.push('Author is required');
  }

  if(body.length === 0){
    errorsMessage.push('Content of post cant be empty')
  }
  return errorsMessage
}

class AddComment extends Component {
  state = {
    id:uniqid(),
    timestamp:Date.now(),
    author:'',
    body:'',
    parentId:'',
    errorsMessage:[]
  }

  handleChange = event => {
   this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount(){
      this.setState({
        parentId:this.props.parentId
      })

  }
  addNewComment = () => {
    const {author,body} = this.state
    const commentData = this.state
    const responseValidation = handleValidation(author,body)

    if(responseValidation.length > 0){
      this.setState({errorsMessage: responseValidation})
    }else{
      this.props.addNewComment(commentData)
      this.setState({
        author:'',
        body:''
      })
      this.props.getPostSelected(this.props.parentId)
      this.props.fetchCommentsByPostId(this.props.parentId)
    }
  }
  render(){
    const {classes, errorsMessage} = this.props
    return(
      <FormControl className={classes.root}  >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="author">Author:</InputLabel>
          <Input  name="author" id="author" value={this.state.author} onChange={this.handleChange}   required/>
        </FormControl>
          <FormControl className={classes.formControl}>

            <TextField
              className={classes.textField}
              name="body"
              id="textarea"
              label="Comment"
              multiline
              margin="normal"
              value={this.state.body}
              onChange={this.handleChange}
              required
            />


          </FormControl>
          <FormControl className={classes.formControl}>
            {errorsMessage && errorsMessage.map(err => (
              <Typography color='error' variant='caption' gutterBottom>
                *{err}
              </Typography>
            ))}
            <Button  variant="contained" size="small" className={classes.button}  color="secondary" onClick={() => this.addNewComment()}>
              <Save  />
              Add comment
            </Button>
          </FormControl>
      </FormControl>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    comments:state.comments,
    posts:state.posts,
  }
}

export default connect(mapStateToProps,{addNewComment,getPostSelected, fetchCommentsByPostId})(withStyles(styles)(AddComment))
