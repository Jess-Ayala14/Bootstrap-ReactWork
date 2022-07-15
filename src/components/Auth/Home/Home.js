import { useEffect, useState } from 'react';
import Files from './Partials/Files';
import Posted from './Partials/Posted';
import Drafts from './Partials/Drafts';
import { Auth, API, Storage } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react'
import { Container, Row, Col, Tab, Button, Modal, Nav, Form, Card, Pagination }
    from 'react-bootstrap';
import './Home.css';
import { listBusinesses } from '../../../graphql/queries';
import { createBusiness as createBusinessMutation }
    from '../../../graphql/mutations';
import img_profile from '../../../storage/generic-profile.jpg'


const initialFormState = { name: '', about: '' }

const Home = () => {

    const [formData, setFormData] = useState(initialFormState);
    let [state, setState] = useState(null);
    const [business, setBusiness] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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

        fetchBusiness()
    }, [])

    const format = (variable) => {
        var data = variable
        data = data.split('"')
        data = data[1]
        return (data)
    }

    async function fetchBusiness() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        await Promise.all(BusinessFromAPI.map(async business => {
            if (business.image) {
                Storage.configure({ level: 'private' })
                const image = await Storage.get(business.image)
                business.image = image
            }
            return business
        }))
        setBusiness(apiData.data.listBusinesses.items);
    }

    async function createBusiness() {
        if (!formData.name || !formData.about) return;
        await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        Storage.configure({ level: 'private' })
        await Storage.put(file.name, file);
        fetchBusiness();
    }

    const [img, setImg] = useState();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };


    if (!state) return <AmplifyLoadingSpinner />


    return (
        <div className='Home' >
            <Container>
                {business.map(business => business.id) != "" ?
                    <div>
                        <br />
                        <Row>
                            <Col xs="4" lg="2">
                                <Card>
                                    {business.map(business => (
                                        <Card.Body>
                                            <Card.Title>{business.name}</Card.Title>
                                            <Card.Text>
                                                <img src={business.image} alt="profile" />
                                            </Card.Text>
                                            <Card.Subtitle>{business.about}</Card.Subtitle>
                                        </Card.Body>
                                    ))}
                                </Card>
                            </Col>
                            <Col xs="5" lg="7">
                                <p>Hello {format(JSON.stringify(state["username"]))}</p>
                                <br />
                                <>This is your email:  {format(JSON.stringify(state["attributes"]["email"]))}</>
                            </Col>
                            <Col xs="3" lg="3">
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
                                    <Col className="Home-col-tab" sm={9}>
                                        <Tab.Content>
                                            <Files />
                                            <Posted />
                                            <Drafts />
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Row>
                    </div>
                    :
                    <div>
                        <br />
                        <Row>
                            <Col sm={3}>
                                <Card>
                                    <Card.Body className='center'>
                                        <Card.Title className="center">{format(JSON.stringify(state["username"]))}</Card.Title>
                                        <Card.Text>
                                            <img src={img_profile} alt="profile" />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={7}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Welcome</Card.Title>
                                    </Card.Header>
                                    <Tab.Container defaultActiveKey="first">
                                        <Tab.Content>
                                            <Card.Body>

                                                <Tab.Pane eventKey="first">
                                                    <Row className="justify-content-md-center">
                                                        <Col md="6">
                                                            <h1>Welcome</h1>
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <Form>
                                                        <Row className="justify-content-md-center">
                                                            <Col md="6 text-left">
                                                                <Form>
                                                                    <Form.Label><h4>Tell us About your Business:</h4></Form.Label>
                                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                                                        placeholder="Type your Business name" value={formData.name} />
                                                                    <br />
                                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                                                                        placeholder="About" value={formData.about} />
                                                                    <br />
                                                                    <Form.Control type="file" onChange={onChange} />
                                                                    <br />
                                                                    <Button onClick={createBusiness}>Save Data</Button>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Tab.Pane>
                                                <br />
                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Text>
                                                   
                                                        <Nav className="justify-content-center">
                                                            <Pagination.Item eventKey="first">
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="first">{"<"}</Nav.Link>
                                                                </Nav.Item>
                                                            </Pagination.Item>
                                                            <Pagination.Item eventKey="second">
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="second">{">"}</Nav.Link>
                                                                </Nav.Item>
                                                            </Pagination.Item>
                                                        </Nav>
                                                   
                                                </Card.Text>
                                            </Card.Footer>
                                        </Tab.Content>
                                    </Tab.Container>

                                </Card>
                            </Col>
                            <Col sm={2} />
                        </Row>
                    </div>

                }
            </Container >
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
        </div >

    )


}

export default Home