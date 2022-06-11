import { useEffect, useState } from 'react';
import Files from './Partials/Files';
import Posted from './Partials/Posted';
import Drafts from './Partials/Drafts';
import { Auth } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react'
import { Container, Row, Col, Tab, Button, Nav, Modal, Form }
    from 'react-bootstrap';
import './Home.css';
import img_profile from '../../../storage/generic-profile.jpg'


const Home = () => {

    let [state, setState] = useState(null)

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

    const format = (variable) => {
        var data = variable
        data = data.split('"');
        data = data[1]
        return (data)
    }

    const [img, setImg] = useState();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!state) return <AmplifyLoadingSpinner />

    return (
        <div className='profile' >
            <br />
            <Container>
                <Row>
                    <Col sm={3}>
                        <img src={img_profile} alt="profile" />
                    </Col>
                    <Col sm={6}>
                        <p>Hello {format(JSON.stringify(state["username"]))}</p>
                        <br />
                        <>This is your email:  {format(JSON.stringify(state["attributes"]["email"]))}</>
                    </Col>
                    <Col sm={3}>
                        <Button variant="primary" onClick={handleShow}>
                            New Post
                        </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="files">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="files">Files</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="posted">Posted</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="drafts">Draft</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col className="profile-col-tab" sm={9}>
                                <Tab.Content>
                                    <Files />
                                    <Posted />
                                    <Drafts />
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Row>
            </Container>
            {/* Modal Form*/}
            <Modal show={show} onHide={handleClose}>
                <div className='modal-post'>
                    <Modal.Header closeButton>
                        <Modal.Title>New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formFileMultiple">
                                <Form.Label>Select Image</Form.Label>
                                <Form.Control type="file" onChange={onImageChange} />
                                <br />
                                <img src={img} alt="" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter a Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Post
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>


    )
}

export default Home