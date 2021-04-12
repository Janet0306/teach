import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Topics from '../topic/Topics';
import Flashcard from '../flashcard/Flashcard';
import Quiz from '../quiz/Quiz';
import UserList from '../Admin/UserList';
import Factsheet from '../factsheet/Factsheet';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
         <PrivateRoute exact path='/topic' component={Topics} />
        <PrivateRoute exact path='/topic/search/:keyword' component={Topics} />
        <PrivateRoute exact path='/topic/page/:pageNumber' component={Topics} />
        <PrivateRoute exact path='/topic/search/:keyword/page/:pageNumber' component={Topics} />
        <PrivateRoute exact path='/topic/flashcard/:id' component={Flashcard} />
        <PrivateRoute exact path='/topic/quiz/:id' component={Quiz} />
        <PrivateRoute exact path='/topic/factsheet/:id' component={Factsheet} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/admin/userlist" component={UserList} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
