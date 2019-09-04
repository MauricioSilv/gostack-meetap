import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Details from '../pages/Details';
import UserProfile from '../pages/UserProfile';
import Dashboard from '../pages/Dashboard';
import NewMeetup from '../pages/NewMeetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/details" component={Details} isPrivate />
      <Route path="/userprofile" component={UserProfile} isPrivate />
      <Route path="/register-meetup" component={NewMeetup} isPrivate />
    </Switch>
  );
}
