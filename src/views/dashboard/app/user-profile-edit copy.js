import {Container, Row, Col, Card, Tab, Form, Button, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

import { useGlobalContext } from '../../../GlobalContext'
import { Pessoas } from '../../../services/Pessoas'

const UserProfileEdit =() =>{
    const { pessoa_logada } = useGlobalContext()
    const [ estado_civil, setEstadoCivil ] = useState([]);
    const [ genero, setGenero ] = useState([]);
    const [ area_atuacao , setAreaAtuacao ] = useState([]);
    const [ foto, setFoto ] = useState(null);
    const [ dados, setDados ] = useState({});
    const PessoaService = new Pessoas();
    const fileInput = useRef(null);
    const changeData = (event, value) => {
        if (value)
            setDados({...dados, [event.target.name]: event.target.value})
        else    
            setDados({...dados, [event.target.name]: event.target.value})
    }
    const handlePencilClick = () => {
        fileInput.current.click();
    };
    const handleFileChange = (event) => {
        changeData(event, URL.createObjectURL(event.target.files[0]));
      };
    const getDados = async () => {
        const estadosCivis = await PessoaService.getEstadosCivis();
        const generos = await PessoaService.getGeneros();
        const areasAtuacoes = await PessoaService.getAreasAtuacoes();
        setEstadoCivil(estadosCivis);
        setGenero(generos);
        setAreaAtuacao(areasAtuacoes);
        setFoto(pessoa_logada.foto_url);
    }
    const updatePessoa = async (formData) => {
        await PessoaService.UpdatePessoa(formData);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('foto', fileInput.current.files[0]);
        formData.append('first_name', pessoa_logada.pessoa_fisica.usuario.first_name);
        formData.append('last_name', pessoa_logada.pessoa_fisica.usuario.last_name);
        formData.append('username', pessoa_logada.pessoa_fisica.usuario.username);
        formData.append('cidade', pessoa_logada.cidade);
        formData.append('data_de_nascimento', pessoa_logada.pessoa_fisica.data_de_nascimento);
        formData.append('pais', pessoa_logada.pais);
        formData.append('estado', pessoa_logada.estado);
        formData.append('cidade', pessoa_logada.cidade);
        formData.append('endereco', pessoa_logada.endereco);
        updatePessoa(formData);
    }
    useEffect(() => {
        getDados();
        const pessoa_local = {...pessoa_logada};
        setDados(pessoa_local);
    }, [])

    if (pessoa_logada && pessoa_logada.pessoa_fisica)
    return(
        <>
        <Container>
            <Tab.Container defaultActiveKey="first">
            <Row>
                <Col lg="12">
                    <Card>
                        <Card.Body className="p-0">
                            <div>
                                <Nav as="ul" variant="pills" className="iq-edit-profile row">
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link  eventKey="first" role="button">
                                            Personal Information
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link eventKey="second" role="button">
                                            Change Password
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link  eventKey="third" role="button">
                                            Email and SMS
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link eventKey="fourth" role="button">
                                            Manage Contact
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={12}>
                    {/* <div className="iq-edit-list-data"> */}
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className="fade show">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Personal Information</h4>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="form-group align-items-center">
                                                <Col md="12">
                                                    <div className="profile-img-edit">
                                                    <img className="profile-pic" src={foto} alt="profile-pic" style={{ 'maxHeight' : '100%' }}/>
                                                    <div className="p-image">
                                                        <i className="ri-pencil-line upload-button text-white" onClick={handlePencilClick}></i>
                                                        <input 
                                                            ref={fileInput} 
                                                            className="file-upload"
                                                            type="file" 
                                                            accept="image/*"
                                                            name="foto"
                                                            onChange={handleFileChange}
                                                        />
                                                    </div>
                                                    </div>
                                                </Col>
                                            </Form.Group>
                                            <Row className="align-items-center">
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label htmlFor="fname"  className="form-label">First Name:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="fname" placeholder="First Name" value={pessoa_logada.pessoa_fisica.usuario.first_name} onChange={changeData} />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label htmlFor="lname" className="form-label">Last Name:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="lname" placeholder="Last Name" value={pessoa_logada.pessoa_fisica.usuario.last_name} onChange={changeData} />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label htmlFor="uname" className="form-label">User Name:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="uname" placeholder="User Name" value={pessoa_logada.pessoa_fisica.usuario.username} onChange={changeData} />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label htmlFor="cname" className="form-label">City:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="cname" placeholder="City" value={pessoa_logada.cidade} onChange={changeData} />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className="form-label d-block">Gender:</Form.Label>
                                                    {genero && genero.map((item) => <Form.Check key={item.id} className="form-check form-check-inline" label={item.nome} onChange={changeData}  />)}
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label htmlFor="dob" className="form-label">Date Of Birth:</Form.Label>
                                                    <Form.Control type="Date" className="form-control" id="dob" placeholder={pessoa_logada.pessoa_fisica.data_de_nascimento} onChange={changeData} />
                                                </Form.Group>
                                                <Form.Group>
                                                <Form.Label>Expertise</Form.Label>
                                                    <div>
                                                        {area_atuacao && area_atuacao.map((item) => {
                                                            return <Form.Check key={item.id} type="checkbox" label={item.nome} className="form-check form-check-inline" onChange={changeData}/>
                                                        })}
                                                    </div>
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className="form-label">Marital Status:</Form.Label>
                                                    <Form.Select className="form-select" aria-label="" onChange={changeData}>
                                                        {estado_civil && estado_civil.map((item) => {
                                                            return <option key={item.id}>{item.nome}</option>
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>
                                                
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label  className="form-label">Country:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="country" placeholder="Country" value={pessoa_logada.pais} onChange={changeData}/>
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className="form-label">State:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="state" placeholder="State" value={pessoa_logada.estado} onChange={changeData}/>
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className="form-label">City:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="city" placeholder="City" value={pessoa_logada.cidade} onChange={changeData}/>
                                                </Form.Group>

                                                <Form.Group className="form-group col-sm-12">
                                                    <Form.Label className="form-label">Address:</Form.Label>
                                                    <Form.Control type="text" className="form-control" id="address" placeholder="Address" value={pessoa_logada.endereco} onChange={changeData}/>
                                                </Form.Group>
                                            </Row>
                                            <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                            <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className="fade show">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Change Password</h4>
                                    </div>
                                    </Card.Header>
                                    <Card.Body>
                                    <Form>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="cpass" className="form-label">Current Password:</Form.Label>
                                            <Link to="#" className="float-end">Forgot Password</Link>
                                            <Form.Control type="Password" className="form-control" id="cpass" defaultValue=""/>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="npass" className="form-label">New Password:</Form.Label>
                                            <Form.Control type="Password" className="form-control" id="npass" defaultValue=""/>
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label htmlFor="vpass" className="form-label">Verify Password:</Form.Label>
                                            <Form.Control type="Password" className="form-control" id="vpass" defaultValue=""/>
                                        </Form.Group>
                                        <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                        <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                    </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third" className="fade show">
                                <Card>
                                    <Card.Header className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Email and SMS</h4>
                                    </div>
                                    </Card.Header>
                                    <Card.Body>
                                    <Form>
                                        <Form.Group className="form-group row align-items-center">
                                            <Form.Label className="col-md-3" htmlFor="emailnotification">Email Notification:</Form.Label>
                                            <Form.Check className="col-md-9 form-check form-switch">
                                                <Form.Check.Input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked11"defaultChecked/>
                                                <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckChecked11">Checked switch checkbox input</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                        <Form.Group className="form-group row align-items-center">
                                            <Form.Label className="col-md-3" htmlFor="smsnotification">SMS Notification:</Form.Label>
                                            <Form.Check className="col-md-9 form-check form-switch">
                                                <Form.Check.Input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked12"defaultChecked/>
                                                <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckChecked12">Checked switch checkbox input</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                        <Form.Group className="form-group row align-items-center">
                                            <Form.Label className="col-md-3" htmlFor="npass">When To Email</Form.Label>
                                            <Col md="9">
                                                <Form.Check className="form-check">
                                                    <Form.Check.Input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault12"/>
                                                    <Form.Check.Label className="form-check-label" htmlFor="flexCheckDefault12">
                                                        You have new notifications.
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check className="form-check d-block">
                                                    <Form.Check.Input className="form-check-input" type="checkbox" defaultValue="" id="email02"/>
                                                    <Form.Check.Label className="form-check-label" htmlFor="email02">You&lsquo;re sent a direct message</Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check className="form-check d-block">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="email03"defaultChecked/>
                                                    <Form.Check.Label className="form-check-label" htmlFor="email03">Someone adds you as a connection</Form.Check.Label>
                                                </Form.Check>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group className="form-group row align-items-center">
                                            <Form.Label className="col-md-3" htmlFor="npass">When To Escalate Emails</Form.Label>
                                            <Col md="9">
                                                <Form.Check className="form-check">
                                                    <Form.Check.Input className="form-check-input" type="checkbox" defaultValue="" id="email04"/>
                                                    <Form.Check.Label className="form-check-label"htmlFor="email04">
                                                        Upon new order.
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check className="form-check d-block">
                                                    <Form.Check.Input className="form-check-input" type="checkbox" defaultValue="" id="email05"/>
                                                    <Form.Check.Label className="form-check-label"htmlFor="email05">New membership approval</Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check className="form-check d-block">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="email06"defaultChecked/>
                                                    <Form.Check.Label className="form-check-label"htmlFor="email06">Member registration</Form.Check.Label>
                                                </Form.Check>
                                            </Col>
                                        </Form.Group>
                                        <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                        <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                    </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth" className="fade show">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Manage Contact</h4>
                                    </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="cno"  className="form-label">Contact Number:</Form.Label>
                                                <Form.Control type="text" className="form-control" id="cno" defaultValue="001 2536 123 458"/>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="email"  className="form-label">Email:</Form.Label>
                                                <Form.Control type="text" className="form-control" id="email" defaultValue="Bnijone@demo.com"/>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="url"  className="form-label">Url:</Form.Label>
                                                <Form.Control type="text" className="form-control" id="url" defaultValue="https://getbootstrap.com"/>
                                            </Form.Group>
                                            <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                            <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    {/* </div> */}
                   
                </Col>
            </Row>
            </Tab.Container>
        </Container>
        </>
    )
    else 
        return null
}

export default UserProfileEdit;