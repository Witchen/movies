import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

import MovieList from './component/MovieList';
import MovieDetail from './component/MovieDetail';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/movie'>
            <MovieDetail />
          </Route>
          <Route path='/'>
            <MovieList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

