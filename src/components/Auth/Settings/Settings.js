import React from 'react'
import Bussiness from './Partials/bussiness-pane';
import Profile from './Partials/profile-pane';
import Socialn from './Partials/socialn-pane';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Container, Row, Col, Tab, Nav }
  from 'react-bootstrap';
import './Settings.css';


function Settings() {
  
  return (
    <div className='settings'>
      <Container>
        <br />
        <Row>
          <Col md='3 text-left'><h2>Settings</h2></Col>
          <Col m="3"></Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Tab.Container id="left-tabs-example" defaultActiveKey="business">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="business">Business Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="User">User Settings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Social">Social Network</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col className="settings-col-tab" sm={9}>
                  <div className='settings-content'>
                    <Tab.Content>
                      <Bussiness />
                      <Profile />
                      <Socialn />
                    </Tab.Content>
                  </div>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

    </div>


  );
}




export default withAuthenticator(Settings);