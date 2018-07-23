import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCommentSelected, getCommentSelected} from '../actions/Comments';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width:'100%',
    display:'block'
  },
  textField:{
    width:'100%',
  },
  paper:{
    marginTop:30,
    padding:15
  }
})

const handleValidation = ( body) => {
  let errorsMessage = ''

  if(body.length === 0){
    errorsMessage = 'Content of post cannot be empty';
  }
  return errorsMessage
}

class EditComment extends Component{
  state = {
    timestamp: Date.now(),
    body:'',
    errorsMessage:''
  }

  componentDidMount(){
    const {commentId} = this.props.match.params
    console.log(commentId)
    this.props.getCommentSelected(commentId)
  }

  componentDidUpdate(prevProps){
    if(this.props.commentSelected !== undefined && prevProps.commentSelected.length === 0){
      this.setState({
        body:this.props.commentSelected.body
      })
    }
  }

  handleChange = event => {
   this.setState({ [event.target.name]: event.target.value });
  }

  editComment(){
    const {body} = this.state
    const commentData = this.state
    const {commentId} = this.props.match.params
    const responseValidation = handleValidation(body)

    if(responseValidation !== ''){
      this.setState({errorsMessage: responseValidation})
    }else{
      this.setState({errorsMessage: ''})
      this.props.updateCommentSelected(commentId, commentData)

      return this.props.history.push(`/posts/${this.props.commentSelected.parentId}`)
    }
  }
  render(){
    const {classes} = this.props
    const {errorsMessage} = this.state
    return(
      <div>
        <Grid  container spacing={24}   alignItems='center' justify='center'>
          <Grid item  xs={8}>
            <Paper className={classes.paper}>
              <FormControl className={classes.root} >
                <Typography variant='display1' align='center'> Edit Comment</Typography>
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
                  <Typography color='error' variant='caption' gutterBottom>
                    {errorsMessage}
                  </Typography>

                  <Button  variant="contained" size="small" className={classes.button}  color="secondary" onClick={() => this.editComment()}>
                    <Save  />
                    Save Changes
                  </Button>
                </FormControl>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    commentSelected:state.comments.commentSelected,
  }
}

export default connect(mapStateToProps,{getCommentSelected,updateCommentSelected})(withStyles(styles)(EditComment))
