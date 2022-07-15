import React, { useState, useEffect } from 'react'
import { Auth, API, Storage } from 'aws-amplify';
import { AmplifyLoadingSpinner } from '@aws-amplify/ui-react';
import { Container, Row, Col, Tab, Card, Button, Form }
    from 'react-bootstrap';
import { listBusinesses } from '../../../../graphql/queries';
import {
    createBusiness as createBusinessMutation,
    updateBusiness as updateBusinessMutation
} from '../../../../graphql/mutations';


const initialFormState = { name: '', about: '' }

const Bussiness = () => {

    const [hideLightbox, setHideLightbox] = useState(true);
    const [business, setBusiness] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchBusiness();
    }, []);

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

    /*
    async function createBusiness() {
        if (!formData.name || !formData.about) return;
        await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
        if (formData.image) {
            Storage.configure({ level: 'private' })
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setBusiness([...business, formData]);
        setFormData(initialFormState);
    }
    */

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

    async function updateNameB() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))
        if (!formData.name) return;
        const updateBusiness = {
            id: id_businesses,
            name: formData.name
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function updateAboutB() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))
        if (!formData.about) return;
        const updateBusiness = {
            id: id_businesses,
            about: formData.about
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
        setBusiness([...business, formData]);
        setFormData(initialFormState);
        window.location.reload();
    }

    async function updatePhoneB() {
        const apiData = await API.graphql({ query: listBusinesses });
        const BusinessFromAPI = apiData.data.listBusinesses.items;
        const id_businesses = BusinessFromAPI[0]['id']
        await Promise.all(BusinessFromAPI.map(async business => {
            return business;
        }))
        if (!formData.phone) return;
        const updateBusiness = {
            id: id_businesses,
            phone: formData.phone
        }

        await API.graphql({ query: updateBusinessMutation, variables: { input: updateBusiness } });
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

    if (!state) return <AmplifyLoadingSpinner />

    return (
        <Tab.Pane eventKey="business">
            <Container>
                <div className='business-list'>
                    <Row>
                        <Card style={{ width: '62rem' }}>
                            <Card.Body>
                                <Card.Title className="text-left">{business.map(business => (business.name)) ?
                                    'Business Name: ' + business.map(business => (business.name))
                                    : 'Undefined'}</Card.Title>
                                <Card.Text>
                                    {business.map(business => business.id) == '' ?
                                        <Form>
                                            <Row className="justify-content-md-center">
                                                <Col md="6 text-left">
                                                    <Form.Label><h6>Tell us About your Business:</h6></Form.Label>
                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'Name': e.target.value })}
                                                        placeholder="Business name" value={formData.name} />
                                                    <br />
                                                    <Form.Control type="text" onChange={e => setFormData({ ...formData, 'About': e.target.value })}
                                                        placeholder="About" value={formData.about} />
                                                    <br />
                                                    <Form.Control type="tel" onChange={e => setFormData({ ...formData, 'Phone': e.target.value })}
                                                        placeholder="Phone" value={formData.phone} />
                                                    <br />
                                                    <Form.Control type="file" onChange={onChange} />
                                                    <br />
                                                    <Button onClick={createBusiness}>Save Data</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                        :
                                        business.map(business => (
                                            <div>
                                                <Row className="justify-content-md-center">
                                                    <Col md="10 text-center" key={business.id || business.name}>
                                                        <h6>Business Info: </h6><p>{business.about}</p>
                                                        <br />
                                                        {
                                                            business.image && <img src={business.image} style={{ width: 150, height: "auto" }} />
                                                        }
                                                        <br />
                                                        <h6>Phone: </h6><p>{!business.phone ? 'No phone' : business.phone}</p>
                                                    </Col>
                                                    <Col md="7"></Col>
                                                    <Col md="3">
                                                        <Card.Link className='text-right' ><a href='#bussiness' onClick={() => setHideLightbox(false)}>Edit</a></Card.Link>
                                                    </Col>
                                                </Row>
                                                <div className={`${hideLightbox ? "hide-lightbox" : "ligthbox"}`}>
                                                    <Row className="justify-content-md-center">
                                                        <Col md="10" lg="6">
                                                            <Form>
                                                                <Row className='justify-content-center'>
                                                                    <Form.Label><h4>Update Info</h4></Form.Label>
                                                                </Row>
                                                                <Row className="justify-content-center">

                                                                    <Col xs="6">
                                                                        <Form.Control type='text'
                                                                            onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                                                                            placeholder={"Name: " + business.name}
                                                                            value={formData.name}
                                                                        />
                                                                    </Col>
                                                                    <Col xs="3">
                                                                        <Button variant="light" onClick={updateNameB}>Update</Button>

                                                                    </Col>

                                                                </Row>
                                                            </Form>
                                                            <br />
                                                            <Form>
                                                                <Row className="justify-content-center">
                                                                    <Col xs="6">
                                                                        <Form.Control type='text'
                                                                            onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                                                                            placeholder={"About: " + business.about}
                                                                            value={formData.about}
                                                                        />
                                                                    </Col>
                                                                    <Col xs="3">
                                                                        <Button  variant="light" onClick={updateAboutB}>Update</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                            <br />
                                                            <Form>
                                                                <Row className="justify-content-center">
                                                                    <Col xs="6">
                                                                        <Form.Control type='tel'
                                                                            onChange={e => setFormData({ ...formData, 'phone': e.target.value })}
                                                                            placeholder={"Phone: " + business.phone}
                                                                            value={formData.phone}
                                                                        />
                                                                    </Col>
                                                                    <Col xs="3">
                                                                        <Button  variant="light" onClick={updatePhoneB}>Update</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                            <br />
                                                            <Row className='justify-content-md-center'>
                                                                <Col xs="6"></Col>
                                                                <Button className='col-3' variant="dark" onClick={() => setHideLightbox(true)}>Close</Button>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </div>
            </Container>
        </Tab.Pane>
    )
}



export default Bussiness;