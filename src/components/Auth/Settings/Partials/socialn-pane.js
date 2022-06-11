import React from 'react'
import { Container, Row, Col, Tab, Button }
    from 'react-bootstrap';
import fb_logo from '../../../../storage/facebook.png';
import ins_logo from '../../../../storage/instagram.png';
import tw_logo from '../../../../storage/twitter.png'

const Socialn = () => {
    return (
        <Tab.Pane eventKey="Social">
            <Container>
                <div className='socialn-list'>
                    <Row className="justify-content-md-center">
                        <Col className='md-2 text-center'>
                            <img src={fb_logo} />
                            <br />
                            <Button variant="primary">Pair</Button>
                        </Col>
                        <Col className='text-center'>
                            <img src={ins_logo} />
                            <br />
                            <Button variant="primary">Pair</Button>
                        </Col>
                        <Col className='text-center'>
                            <img src={tw_logo} />
                            <br />
                            <Button variant="primary">Pair</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Tab.Pane>
    )
}


export default Socialn;