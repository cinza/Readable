import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNewPost} from '../actions/Posts';
import uniqid from 'uniqid';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

const handleValidation = (title, author, category, body) => {
  const errorsMessage = []

  if(title.length === 0){
    errorsMessage.push('Title is required');
  }
  if(author.length === 0){
    errorsMessage.push('Author is required');
  }
  if(category.length === 0){
    errorsMessage.push('You must select a category')
  }
  if(body.length === 0){
    errorsMessage.push('Content of post cant be empty')
  }
  return errorsMessage
}

class NewPost extends Component {
  state = {
    id:uniqid(),
    title:'',
    author:'',
    category:'',
    body:'',
    timestamp:Date.now(),
    errorsMessage:[]
  }
  handleChange = event => {
   this.setState({ [event.target.name]: event.target.value });
  }

  addNewPost(){
    const {title, author, category, body} = this.state
    const postData = this.state

    const responseValidation = handleValidation(title, author, category, body)

    if(responseValidation.length > 0){
      this.setState({errorsMessage: responseValidation})
    }else{
      this.props.addNewPost(postData)
      return this.props.history.push('/')
    }
  }

  render(){
    const {categories, classes} = this.props
    const {errorsMessage} = this.state
    console.log(this.props, this.state)
    return(
      <div>
        <Grid  container spacing={24}   alignItems='center' justify='center'>
          <Grid item  xs={8}>
            <Paper className={classes.paper}>
              <FormControl className={classes.root} >
                <Typography variant='display1' align='center'> Create a new Post</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="category">Select Category:</InputLabel>
                  <Select
                    value={this.state.category}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'category',
                      id: 'category',
                    }}
                    required>
                    {categories && Object.keys(categories).map(category => {
                      return (
                        <MenuItem key={categories[category].name} value={categories[category].name}>{categories[category].name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="title">Title:</InputLabel>
                  <Input  name="title" id="title" value={this.state.title} onChange={this.handleChange}   required/>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="author">Author:</InputLabel>
                  <Input name="author" id="author" value={this.state.author} onChange={this.handleChange}   required/>
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

                  <Button  variant="contained" size="small" className={classes.button}  color="secondary" onClick={() => this.addNewPost()}>
                    <Save  />
                    Add Post
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
    categories: state.categories.categories
  }
}

export default connect(mapStateToProps, {addNewPost})(withStyles(styles)(NewPost));
