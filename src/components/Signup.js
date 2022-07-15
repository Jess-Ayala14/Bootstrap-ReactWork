import React, { Component } from 'react';
import Home from './Auth/Home/Home';
//import './Signup.css';
import { withAuthenticator } from '@aws-amplify/ui-react'



class Signup extends Component {

  render() {

    return (
        <div className="Signup">
          <Home />
        </div>
    );
  }
}

export default withAuthenticator(Signup);
