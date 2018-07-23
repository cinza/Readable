import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home.js'
import HeaderMenu from './components/HeaderMenu'
import PostDetail from './components/PostDetail'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'

class App extends Component {
  render() {
    return (
        <div>
          <HeaderMenu/>
          <Switch>
            <Route exact path='/' component={props => <Home {...props} />}  />
            <Route exact path='/posts/new/' component={NewPost}/>
            <Route exact path='/posts/:postId' component={PostDetail} />
            <Route exact path= '/edit/post/:postId'  component={props => <EditPost {...props} />}  />
            <Route exact path= '/edit/comment/:commentId'  component={props => <EditComment {...props} />}  />
            <Route exact path='/:category/' component={props => <Home {...props} />} />
          </Switch>
        </div>

    );
  }
}

export default App;
