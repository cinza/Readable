import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPostSelected, updatePostSelected} from '../actions/Posts';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
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
});

const handleValidation = (title, body) => {
  const errorsMessage = []

  if(title.length === 0){
    errorsMessage.push('Title is required');
  }

  if(body.length === 0){
    errorsMessage.push('Content of post cant be empty')
  }
  return errorsMessage
}

class EditPost extends Component {
  state = {
    title:'',
    body:'',
    errorsMessage:[]
  }

  componentDidMount(){
    const {postId} = this.props.match.params
    this.props.getPostSelected(postId)
  }

  componentDidUpdate(prevProps){
    if(this.props.postSelected !== undefined && prevProps.postSelected.length === 0){
      this.setState({
        title: this.props.postSelected.title,
        body: this.props.postSelected.body
      })
    }
  }

  handleChange = event => {
   this.setState({ [event.target.name]: event.target.value });
  }

  editPost(){
    const {title, body} = this.state
    const postData = this.state
    const {postId} = this.props.match.params

    const responseValidation = handleValidation(title, body)

    if(responseValidation.length > 0){
      this.setState({errorsMessage: responseValidation})
    }else{
      this.props.updatePostSelected(postId, postData)

      return this.props.history.push('/')
    }
  }

  render(){
    const { classes} = this.props
    const {errorsMessage} = this.state

    return(
      <div>
        <Grid  container spacing={24}   alignItems='center' justify='center'>
          <Grid item  xs={8}>
            <Paper className={classes.paper}>
              <FormControl className={classes.root} >
                <Typography variant='display1' align='center'> Edit Post</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="title">Title:</InputLabel>
                  <Input  name="title" id="title" value={this.state.title} onChange={this.handleChange}   required/>
                </FormControl>

                <FormControl className={classes.formControl}>

                  <TextField
                    className={classes.textField}
                    name="body"
                    id="textarea"
                    label="Post Content"
                    placeholder="Placeholder"
                    multiline
                    margin="normal"
                    value={this.state.body}
                    onChange={this.handleChange}
                    required
                  />
                </FormControl>

                <FormControl className={classes.FormControl}>
                  {errorsMessage && errorsMessage.map(err => (
                    <Typography color='error' variant='caption' gutterBottom>
                      *{err}
                    </Typography>
                  ))}

                  <Button  variant="contained" size="small" className={classes.button}  color="secondary" onClick={() => this.editPost()}>
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
  return{
    postSelected: state.posts.postSelected
  }
}


export default connect(mapStateToProps, {getPostSelected,updatePostSelected})(withStyles(styles)(EditPost));
