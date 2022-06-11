import React from 'react'
import { Tab, Nav } from 'react-bootstrap';

export const Files = () => {
    return (
        <>
            <Tab.Pane eventKey="files">
                <Tab.Container defaultActiveKey="facebook-files">
                    <Nav variant="pills" defaultActiveKey="facebook-files">
                        <Nav.Item>
                            <Nav.Link eventKey="facebook-files">Facebook</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="instagram-files">Instagram</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="twitter-files">Twitter</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className='socialM-content'>
                        <Tab.Content>
                            <Tab.Pane eventKey="facebook-files" Active>
                                <p>Facebook Files</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="instagram-files">
                                <p>Instagram Files</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="twitter-files">
                                <p>Twitter Files</p>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </Tab.Pane>
        </>
    )
}


export default Files