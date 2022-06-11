import React, {Component} from 'react'
import Home from './Auth/Home/Home';
//import './Signup.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Container, Row, Col } from 'react-bootstrap';


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
