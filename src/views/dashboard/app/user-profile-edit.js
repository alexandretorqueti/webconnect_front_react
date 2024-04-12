import {Container, Row, Col, Card, Tab, Nav} from 'react-bootstrap'
import { useState, useEffect } from 'react'

import { useGlobalContext } from '../../../GlobalContext'
import { Pessoas } from '../../../services/Pessoas'

import Form from '../../../utilities/form'

const UserProfileEdit =() =>{
    const { pessoa_logada } = useGlobalContext()
    const PessoaService = new Pessoas();
    const [dataAux, setDataAux] = useState({});
    const [ pessoa, setPessoa ] = useState({}); 
    const [ dados_processados, setDadosProcessados ] = useState(false);
    const handleUpdateData = (data) => {
        const run = async () => {
            const result = await PessoaService.UpdatePessoa(data);
            if (result.success) {
                location.href = '/';
            }
        }
        run();
    }
    const copiaProp = (pessoa_local, prop_a_copiar) =>
    {
        const propriedades_a_copiar = Object.keys(pessoa_local[prop_a_copiar]);
        propriedades_a_copiar.forEach(propriedade => {
            if (propriedade != prop_a_copiar) {
                if (propriedade === '_field_details') {
                    pessoa_local[propriedade] = {...pessoa_local[propriedade], ...pessoa_local[prop_a_copiar][propriedade]};
                }
                else {
                    pessoa_local[propriedade] = pessoa_local[prop_a_copiar][propriedade];
                }
            }
        });
    }
    const getDados = async () => {
        const estadocivil = await PessoaService.getEstadosCivis();
        const genero = await PessoaService.getGeneros();
        const areas_atuacao = await PessoaService.getAreasAtuacoes();
        setDataAux({
            estadocivil: estadocivil,
            genero: genero,
            areas_atuacao: areas_atuacao
        });
        const pessoa_local = {...pessoa_logada};
        copiaProp(pessoa_local.pessoa_fisica, 'usuario');
        copiaProp(pessoa_local, 'pessoa_fisica');
        setPessoa(pessoa_local);
    }
    useEffect(() => {
        if (pessoa_logada.id && !dados_processados) {
            setDadosProcessados(true);
            getDados();
        }
    }, [pessoa_logada])

    if (pessoa && pessoa.pessoa_fisica)
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
                                        <Form 
                                            data={pessoa} 
                                            dataAux={dataAux} 
                                            fnUpdateData={handleUpdateData}
                                            exclude={['status_online', 'hora_ultimo_login', 'pessoa_juridica', 'usuario', 'nome']}>
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