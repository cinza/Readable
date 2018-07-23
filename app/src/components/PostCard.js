import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Settings from './Settings';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Timestamp from 'react-timestamp';

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

class PostCard extends Component {

  render(){
    const {post, classes} = this.props

    return(
      <Grid item xs key={post.id}>
        <Card  className={classes.card}>
          <Link to={`/posts/${post.id}`} params={{ id: post.id }}>
            <CardHeader title={post.title}/>
          </Link>
          <Timestamp time={post.timestamp} format='date' className={classes.items}/>
          <span className={classes.items}>Comments: {post.commentCount} </span>
          <CardContent>

          </CardContent>
          <CardActions>
            <Settings elementValue={post} typeElement={'post'}/>

          </CardActions>
        </Card>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(withStyles(styles)(PostCard));
