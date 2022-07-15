import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Navebar from './Navebar';
import logo from '../logo.svg';


class Welcome extends Component {

  render() {

    return (

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
    )
  }
}


export default Welcome