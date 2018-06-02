import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import AllBooksQuery from './AllBooksQuery';
import SearchForm from './SearchForm';
import AuthMutn from './AuthMutn';
import MyBooksQry from './MyBooksQry';
// import AddBookMutn from './AddBookMutn';

const App = () => (
  <React.Fragment>
    <Navbar />
    <Switch>
      <Route exact path="/" component={AllBooksQuery} />
      <Route exact path="/searchbooks" component={SearchForm} />
      <Route exact path="/createaccount" component={AuthMutn} />
      <Route exact path="/signin" component={AuthMutn} />
      <Route exact path="/mybooks" component={MyBooksQry} />
    </Switch>
  </React.Fragment>
);

export default App;
