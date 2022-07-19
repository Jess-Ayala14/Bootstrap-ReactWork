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
//import img_profile from '../../../storage/generic-profile.jpg'


const initialFormState = { name: '', about: '' }

const Home = () => {

    const [formData, setFormData] = useState(initialFormState);
    let [state, setState] = useState(null);
    const [business, setBusiness] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const DbTable = this.state.DbTable;


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
        data = data.charAt(0).toUpperCase() + data.slice(1);
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
    }

    const Table = () => {
        if (business.map(business => business.id) != "")
            return true
        else
            return false
    }

    if (!state) return <AmplifyLoadingSpinner />

    return (
        <div className='Home' >
            {Table() ?
                <Container>
                    <div>
                        <br />
                        <Row>
                            <Col xs={5} md={3} lg={2}>
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
                            <Col xs={4} md={6} lg={7} />
                            <Col xs={3} md={3} lg={3}>
                                <Button variant="primary" onClick={handleShow}>
                                    New Post
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="files">
                                    <Col sm={3} md={3} lg={2}>
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
                                    <Col className="Home-col-tab" sm={9} md={9} lg={8}>
                                        <Tab.Content>
                                            <Files />
                                            <Posted />
                                            <Drafts />
                                        </Tab.Content>
                                    </Col>
                            </Tab.Container>
                        </Row>
                    </div>
                </Container>
                :
                <Container>
                    <div>
                        <br />
                        <Row>
                            <Col sm={1} md={2} lg={3} />
                            <Col sm={10} md={8} lg={6}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Welcome to Ali-Media Tools</Card.Title>
                                    </Card.Header>
                                    <Tab.Container defaultActiveKey="first">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <Card.Body>
                                                    <Row className="justify-content-md-center">
                                                        <Col md={10} sm={12} lg={8} >
                                                            <p>
                                                                Hello {format(JSON.stringify(state["username"]))},
                                                                welcome to Ali-Media-Tools. Thank you for accepting
                                                                to participate: you have been invited to probe this
                                                                functional prototype, which consists add multiple
                                                                fuctions of your favorites social media. On this site,
                                                                you could post and watch your history post from Facebook,
                                                                also Instagram, and Twitter at the same point.
                                                            </p>
                                                            <br />
                                                            <h4>Please press next</h4>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Card.Body>
                                                    <Form>
                                                        <Row className="justify-content-md-center">
                                                            <Col md={10} sm={12} lg={8}>
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
                                                </Card.Body>
                                            </Tab.Pane>
                                            <br />
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
                            <Col sm={1} md={2} lg={6} />
                        </Row>
                    </div>
                </Container >
            }

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