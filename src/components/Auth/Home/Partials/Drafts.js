import React from 'react'
import {Tab, Nav} from 'react-bootstrap'

export const Drafts = () => {
    return (
        <>
            <Tab.Pane eventKey="drafts">
                <Tab.Container defaultActiveKey="facebook-draft">
                    <Nav variant="pills" defaultActiveKey="facebook-draft">
                        <Nav.Item>
                            <Nav.Link eventKey="facebook-draft">Facebook</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="instagram-draft">Instagram</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="twitter-draft">Twitter</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className="socialM-content">
                    <Tab.Content>
                        <Tab.Pane eventKey="facebook-draft">
                            <p>Facebook Draft</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="instagram-draft">
                            <p>Instagram Draft</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="twitter-draft">
                            <p>Twitter Draft</p>
                        </Tab.Pane>
                    </Tab.Content>
                    </div>
                </Tab.Container>
            </Tab.Pane>
        </>
    )
};


export default Drafts