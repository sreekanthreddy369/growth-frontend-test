import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Posts from './components/Posts';
import PostVideo from './components/PostVideo';
import { PostsProvider } from "./components/PostsContext";

function App() {

  return (
    <PostsProvider>
      <div className="App">
        <h1> Growth Front end Development Test</h1>
        <div className="app-container">
          <Router>
            <Switch>
              <Route exact path="/" component={Posts}></Route>
              <Route exact path={`/posts/:id`} component={PostVideo}></Route>
            </Switch>
          </Router>
        </div>
      </div>
    </PostsProvider>
  );
}

export default App;
