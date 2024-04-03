import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Form, Tab, Nav, Button} from 'react-bootstrap'
import Card from '../../../../components/Card'

import PessoaChat from '../../../../components/pessoas/chat/PessoaChat'
import Messages from './messages'

import { Pessoas } from '../../../../services/Pessoas'
import './chat.css'
import { useGlobalContext } from '../../../../GlobalContext'

const Chat=()=>{
    const [showChat, setShowChat] = useState(false)
    const [show1, setShow1] = useState('')
    const PessoasService = new Pessoas();
    const [pessoas_com_relacao, setPessoasComRelacao] = useState([]);
    const [pessoa_selecionada, setPessoaSelecionada] = useState({});
    const { pessoa_logada } = useGlobalContext();
    useEffect(() => {
        const run = async () => {
            setShowChat(false)
            const pessoas_com_relacao_local = await PessoasService.getPessoasComRelacao();
            setPessoasComRelacao(pessoas_com_relacao_local);
        }
        run();
    }, []);
    
    return(
        (pessoa_logada) &&
        <Tab.Container id="left-tabs-example"  defaultActiveKey="start">                        
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Body className="chat-page p-0">
                            <div className="chat-data-block">
                                <Row>
                                    <Col lg="3" className="chat-data-left scroller">
                                        <div className="chat-search pt-3 ps-3">
                                            <div className="d-flex align-items-center" onClick={() => setShow1('true')} style={{ 'cursor':'pointer' }}>
                                                <div className="chat-profile me-3">
                                                    <img loading="lazy" src={pessoa_logada.foto_url} alt="chat-user" className="avatar-60 "/>
                                                </div>
                                                <div className="chat-caption">
                                                    <h5 className="mb-0">{pessoa_logada.nome}</h5>
                                                    {pessoa_logada.areas_atuacao && pessoa_logada.areas_atuacao.map((area) =>
                                                    <p key={area.id} className="m-0">{area.nome}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div id="user-detail-popup" className={`scroller ${show1 === 'true' ? 'show' : '' }`}>
                                                <div className="user-profile">
                                                    <Button type="submit" variant=" close-popup p-3"><i className="material-symbols-outlined md-18" onClick={() => setShow1('false')}>close</i></Button>
                                                    <div className="user text-center mb-4">
                                                        <Link className="avatar m-0" to="">
                                                            <img loading="lazy" src={pessoa_logada.foto_url} alt="avatar" className="avatar-60 "/>
                                                        </Link>
                                                        <div className="user-name mt-4">
                                                            <h4 className="text-center">{pessoa_logada.nome}</h4>
                                                        </div>
                                                        <div className="user-desc">
                                                            {pessoa_logada.areas_atuacao && pessoa_logada.areas_atuacao.map((area) =>
                                                            <p key={area.id} className="text-center">{area.nome}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="user-detail text-left mt-4 ps-4 pe-4">
                                                        <h5 className="mt-4 mb-4">About</h5>
                                                        <p>{pessoa_logada.apresentacao}</p>
                                                        <h5 className="mt-3 mb-3">Status</h5>
                                                        <ul className="user-status p-0">
                                                            {pessoa_logada.status_online ? 
                                                            <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-success pe-1"></i><span>Online</span></li>
                                                            :
                                                            <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-light pe-1"></i><span>Offline</span></li>
                                                            }
                                                            {false && 
                                                            <>
                                                            <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-warning pe-1"></i><span>Away</span></li>
                                                            <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-danger pe-1"></i><span>Do Not Disturb</span></li>
                                                            </>
                                                            }

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chat-searchbar mt-4">
                                                <Form.Group className="form-group chat-search-data m-0">
                                                    <input type="text" className="form-control round" id="chat-search" placeholder="Search"/>
                                                        <i className="material-symbols-outlined">
                                                            search
                                                        </i>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="chat-sidebar-channel scroller mt-4 ps-3">
                                        <h5 className="mt-3">Direct Message</h5>
                                        <Nav variant="pills" className="iq-chat-ui nav flex-column ">
                                            {
                                            pessoas_com_relacao.map((pessoa, index) => 
                                                <PessoaChat 
                                                key={pessoa.id} 
                                                chave={index}
                                                pessoa={pessoa}
                                                setShowChat={setShowChat}
                                                setPessoaSelecionada={setPessoaSelecionada}
                                                    />)
                                            }
                                        </Nav>
                                    </div>
                                    </Col>
                                    <Col lg={9} className=" chat-data p-0 chat-data-right">
                                        <Tab.Content>
                                            {showChat ?
                                            <Messages pessoa={pessoa_selecionada} pessoa_logada={pessoa_logada}></Messages>
                                            :
                                            <Tab.Pane eventKey="start" className="tab-pane fade show" id="default-block" role="tabpanel">
                                            <div className="chat-start">
                                                <span className="iq-start-icon text-primary"><i className="material-symbols-outlined md-42">sms</i></span>
                                                <Button id="chat-start" prefix="btn bg-white mt-3">Start
                                                Conversation!</Button>
                                            </div>
                                            </Tab.Pane>
                                            }
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Tab.Container>
    )
}
export default Chat;    