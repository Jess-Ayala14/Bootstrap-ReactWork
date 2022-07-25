import React, { useState, useEffect } from 'react'
import { API, Auth, Storage } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Col, Tab, Button, Modal }
    from 'react-bootstrap';
import fb_logo from '../../../../storage/facebook.png';
import ins_logo from '../../../../storage/instagram.png';
import tw_logo from '../../../../storage/twitter.png';
import { listBusinesses } from '../../../../graphql/queries';
import {
    updateBusiness as updateBusinessMutation
} from '../../../../graphql/mutations';
import { FacebookProvider, LoginButton } from 'react-facebook';




const Socialn = () => {

    const [business, setBusiness] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleShow2 = () => setShow2(true);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);

    useEffect(() => {
        fetchBusiness();
    }, []);

    const handleResponse = (data) => {
        console.log(data);
    }

    const handleError = (error) => {
        this.setState({ error });
    }

    async function fetchBusiness() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        await Promise.all(BusinessFromAPI.map(async business => {
            if (business.image) {
                Storage.configure({ level: 'private' })
                const image = await Storage.get(business.image);
                business.image = image;
            }
            return business;
        }))
        setBusiness(apiData.data.listBusinesses.items);
    }


    async function Pair_FB_API() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))

        const updateBusiness = {
            id: id_businesses,
            facebook_API: '{"FB":1}'
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
        window.location.reload();
    }

    async function blank_FB_API() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))

        const updateBusiness = {
            id: id_businesses,
            facebook_API: ''
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
        window.location.reload();
    }

    let [state, setState] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser()
                setState(response)
            } catch (err) {
                console.error(err)
                setState(null)
            }
        })()
    }, [])




    if (!state) return <AmplifyLoadingSpinner />

    return (
        <Tab.Pane eventKey="Social">
            <Container>
                <div className='socialn-list'>
                    <Row className="justify-content-md-center">
                        <Col className='md-2 text-center'>
                            <img src={fb_logo} />
                            <br />
                            <Button variant="primary" onClick={handleShow}>Pair</Button>
                        </Col>
                        {/*
                        <Col className='text-center'>
                            <img src={ins_logo} />
                            <br />
                            <Button variant="primary" onClick={handleShow1}>Pair</Button>
                        </Col>
                        <Col className='text-center'>
                            <img src={tw_logo} />
                            <br />
                            <Button variant="primary" onClick={handleShow2}>Pair</Button>
                        </Col>
    */}
                    </Row>
                </div>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Facebook Authorization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    As a Guest to test this functional prototype
                    of the degree project for social networks and
                    with the purpose of incorporating them into it.
                    You authorize the use of facebook from this website,
                    you will authorize the API: Facebook for Developers,
                    authenticating as you do on Facebook. This website
                    could save certain credentials to avoid repeating this
                    process, without the need to save your password and
                    user of the Facebook social network.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <FacebookProvider appId="801174264382809">
                        <LoginButton
                            className="btn-primary"
                            scope="email"
                            onCompleted={handleResponse}
                            onError={handleError}
                        >
                            <span>Login via Facebook</span>
                        </LoginButton>
                    </FacebookProvider>
                </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Instagram Authorization</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal for Instagram </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Twitter Authorization</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal for Twitter </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Tab.Pane>


    )
}


export default Socialn;