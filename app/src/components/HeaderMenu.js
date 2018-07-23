import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/Categories';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles={
  root: {
  flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
};

class HeaderMenu extends Component{

  componentDidMount(){
    this.props.fetchCategories()
  }

  render() {
    const {categories} = this.props
    return(
      <AppBar position="static">

          <Toolbar>
            <Typography variant="title" color="inherit">
                Readable
            </Typography>
            <div  style={{ flex: 1 }}>
              <Button color="inherit" href="/">All</Button>
              {categories ? (
                categories.map(category => {
                  return (<Button color="inherit" href={`/${category.path}`}  key={category.name} > {category.name} </Button>)
                })
              ):  (<div></div>)}
            </div>

          </Toolbar>


      </AppBar>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    categories: state.categories.categories,
  }
};


export default connect(mapStateToProps, {fetchCategories})(withStyles(styles)(HeaderMenu))
