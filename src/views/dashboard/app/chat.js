import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Form, Tab, Nav, Button,Dropdown} from 'react-bootstrap'
import Card from '../../../components/Card'
import CustomToggle from '../../../components/dropdowns'
import PessoaChat from '../../../components/pessoas/chat/PessoaChat'

//img
import user1 from '../../../assets/images/user/1.jpg'
import user5 from '../../../assets/images/user/05.jpg'

import { Pessoas } from '../../../services/Pessoas'

const Chat=()=>{
    const [showChat, setShowChat] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [show1, setShow1] = useState('')
    const [pessoa_logada, setPessoaLogada] = useState({});
    const PessoasService = new Pessoas();
    const [pessoas_com_relacao, setPessoasComRelacao] = useState([]);
    useEffect(() => {
        const run = async () => {
            setShowChat(false)
            const pessoa_logada_local = await PessoasService.getUsuarioLogado();
            setPessoaLogada(pessoa_logada_local);
            const pessoas_com_relacao_local = await PessoasService.getPessoasComRelacao();
            setPessoasComRelacao(pessoas_com_relacao_local);
        }
        run();
    }, []);
    
    return(
        <>
            <Tab.Container id="left-tabs-example"  defaultActiveKey="start">                        
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Body className="chat-page p-0">
                                <div className="chat-data-block">
                                    <Row>
                                        <Col lg="3" className="chat-data-left scroller">
                                            <div className="chat-search pt-3 ps-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="chat-profile me-3">
                                                        <img loading="lazy" src={pessoa_logada.foto_url} alt="chat-user" className="avatar-60 " onClick={() => setShow1('true')}/>
                                                    </div>
                                                    <div className="chat-caption">
                                                        <h5 className="mb-0">{pessoa_logada.nome}</h5>
                                                        <p className="m-0">{pessoa_logada.apresentacao}</p>
                                                    </div>
                                                </div>
                                                <div id="user-detail-popup" className={`scroller ${show1 === 'true' ? 'show' : '' }`}>
                                                    <div className="user-profile">
                                                        <Button type="submit" variant=" close-popup p-3"><i className="material-symbols-outlined md-18" onClick={() => setShow1('false')}>close</i></Button>
                                                        <div className="user text-center mb-4">
                                                            <Link className="avatar m-0" to="">
                                                                <img loading="lazy" src={user1} alt="avatar"/>
                                                            </Link>
                                                            <div className="user-name mt-4">
                                                                <h4 className="text-center">Bni Jordan</h4>
                                                            </div>
                                                            <div className="user-desc">
                                                                <p className="text-center">Web Designer</p>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="user-detail text-left mt-4 ps-4 pe-4">
                                                            <h5 className="mt-4 mb-4">About</h5>
                                                            <p>It is long established fact that a reader will be distracted bt the reddable.</p>
                                                            <h5 className="mt-3 mb-3">Status</h5>
                                                            <ul className="user-status p-0">
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-success pe-1"></i><span>Online</span></li>
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-warning pe-1"></i><span>Away</span></li>
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-danger pe-1"></i><span>Do Not Disturb</span></li>
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-light pe-1"></i><span>Offline</span></li>
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
                                                    nome={pessoa.nome} 
                                                    foto={pessoa.foto_url} 
                                                    horaLogado={pessoa.hora_ultimo_login_humanizada}
                                                    online={pessoa.status_online} 
                                                    numeroNotificacoes={pessoa.quantidade_de_mensagens_nao_lidas}
                                                    setShowChat={setShowChat}
                                                     />)
                                                }
                                            </Nav>
                                        </div>
                                        </Col>
                                        <Col lg={9} className=" chat-data p-0 chat-data-right">
                                            <Tab.Content>
                                                {showChat ?
                                                <Tab.Pane  eventKey="chat"  className="fade show active" id="chatbox"  role="tabpanel">
                                                    <div className="chat-head">
                                                        <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
                                                            <div className="d-flex align-items-center">
                                                                <div className="sidebar-toggle">
                                                                    <i className="ri-menu-3-line"></i>
                                                                </div>
                                                                <div className="avatar chat-user-profile m-0 me-3" style={{ 'cursor': 'pointer' }} onClick={() => setShowDetail(true)}>
                                                                    <img loading="lazy" src={user5} alt="avatar" className="avatar-50 " />
                                                                    <span className="avatar-status"><i className="material-symbols-outlined text-success  md-14 filled">circle</i></span>
                                                                </div>
                                                                <h5 className="mb-0">Team Discussions</h5>
                                                            </div>
                                                            {showDetail && 
                                                            <div  className={`chat-user-detail-popup scroller`}>
                                                                <div className="user-profile">
                                                                <Button type="submit" variant=" close-popup p-3"><i className="material-symbols-outlined md-18" >close</i></Button>
                                                                    <div className="user mb-4  text-center">
                                                                        <Link className="avatar m-0" to="">
                                                                            <img loading="lazy" src={user5} alt="avatar"/>
                                                                        </Link>
                                                                        <div className="user-name mt-4">
                                                                            <h4>Bni Jordan</h4>
                                                                        </div>
                                                                        <div className="user-desc">
                                                                            <p>Cape Town, RSA</p>
                                                                        </div>
                                                                    </div>
                                                                    <hr/>
                                                                    <div className="chatuser-detail text-left mt-4">
                                                                        <Row>
                                                                            <Col md="6" className="col-6  title">Bni Name:</Col>
                                                                            <Col md="6" className="col-6  text-right">Bni</Col>
                                                                        </Row>
                                                                        <hr/>
                                                                        <Row>
                                                                            <Col md="6" className="col-6 title">Tel:</Col>
                                                                            <Col md="6" className="col-6 text-right">072 143 9920</Col>
                                                                        </Row>
                                                                        <hr/>
                                                                        <Row>
                                                                            <Col md="6" className="col-6 title">Date Of Birth:</Col>
                                                                            <Col md="6" className="col-6 text-right">July 12, 1989</Col>
                                                                        </Row>
                                                                        <hr/>
                                                                        <Row>
                                                                            <Col md="6" className="col-6 title">Gender:</Col>
                                                                            <Col md="6" className="col-6 text-right">Male</Col>
                                                                        </Row>
                                                                        <hr/>
                                                                        <Row>
                                                                            <Col md="6" className="col-6 title">Language:</Col>
                                                                            <Col md="6" className="col-6 text-right">Engliah</Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            }
                                                            
                                                            <div className="chat-header-icons d-flex">
                                                                <Link to="#" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                    <i className="material-symbols-outlined md-18">phone</i>
                                                                </Link>
                                                                <Link to="#" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                    <i className="material-symbols-outlined md-18">videocam</i>
                                                                </Link>
                                                                <Link to="#" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                    <i className="material-symbols-outlined md-18">delete</i>
                                                                </Link>
                                                                <Dropdown className="bg-soft-primary d-flex justify-content-center align-items-center" as="span">
                                                                    <Dropdown.Toggle as={CustomToggle} variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show">
                                                                        more_vert
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="dropdown-menu-right">
                                                                        <Dropdown.Item className="d-flex align-items-center" href="#"><i className="material-symbols-outlined md-18 me-1">push_pin</i>Pin to top</Dropdown.Item>
                                                                        <Dropdown.Item className="d-flex align-items-center" href="#"><i className="material-symbols-outlined md-18 me-1">delete_outline</i>Delete chat</Dropdown.Item>
                                                                        <Dropdown.Item className="d-flex align-items-center" href="#"><i className="material-symbols-outlined md-18 me-1">watch_later</i>Block</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </header>
                                                    </div>
                                                    <div className="chat-content scroller">
                                                        <div className="chat d-flex other-user">
                                                            <div className="chat-user">
                                                                <Link className="avatar m-0" to="">
                                                                    <img loading="lazy" src={user1} alt="avatar" className="avatar-35 "/>
                                                                </Link>
                                                                <span className="chat-time mt-1">6:45</span>
                                                            </div>
                                                            <div className="chat-detail">
                                                                <div className="chat-message">
                                                                    <p>How can we help? We re here for you! 😄</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat chat-left">
                                                            <div className="chat-user">
                                                                <Link className="avatar m-0" to="">
                                                                    <img loading="lazy" src={user5} alt="avatar" className="avatar-35 "/>
                                                                </Link>
                                                                <span className="chat-time mt-1">6:48</span>
                                                            </div>
                                                            <div className="chat-detail">
                                                                <div className="chat-message">
                                                                    <p>Hey John, I am looking for the best admin template.</p>
                                                                    <p>Could you please help me to find it out? 🤔</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat chat d-flex other-user">
                                                            <div className="chat-user">
                                                                <Link className="avatar m-0" to="">
                                                                    <img loading="lazy" src={user1} alt="avatar" className="avatar-35 "/>
                                                                </Link>
                                                                <span className="chat-time mt-1">6:49</span>
                                                            </div>
                                                            <div className="chat-detail">
                                                                <div className="chat-message">
                                                                    <p>Absolutely!</p>
                                                                    <p>SocialV Dashboard is the responsive bootstrap 5 admin template.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat chat-left">
                                                            <div className="chat-user">
                                                                <Link className="avatar m-0" to="">
                                                                    <img loading="lazy" src={user5} alt="avatar" className="avatar-35 "/>
                                                                </Link>
                                                                <span className="chat-time mt-1">6:52</span>
                                                            </div>
                                                            <div className="chat-detail">
                                                                <div className="chat-message">
                                                                    <p>Looks clean and fresh UI.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat d-flex other-user">
                                                            <div className="chat-user">
                                                                <Link className="avatar m-0" to="">
                                                                    <img loading="lazy" src={user1} alt="avatar" className="avatar-35 "/>
                                                                </Link>
                                                                <span className="chat-time mt-1">6:53</span>
                                                            </div>
                                                            <div className="chat-detail">
                                                                <div className="chat-message">
                                                                    <p>Thanks, from ThemeForest.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat chat-left">
                                                            <div className="chat-user">
                                                                <Link className="avatar m-0" to="">
                                                                    <img loading="lazy" src={user5} alt="avatar" className="avatar-35 "/>
                                                                </Link>
                                                                <span className="chat-time mt-1">6:54</span>
                                                            </div>
                                                            <div className="chat-detail">
                                                                <div className="chat-message">
                                                                    <p>I will purchase it for sure. 👍</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat d-flex other-user">
                                                            <div className="chat-user">
                                                                <Link className="avatar m-0" to="">
                                                                    <img loading="lazy" src={user1} alt="avatar" className="avatar-35 "/>
                                                                </Link>
                                                                <span className="chat-time mt-1">6:56</span>
                                                            </div>
                                                            <div className="chat-detail">
                                                                <div className="chat-message">
                                                                    <p>Okay Thanks..</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="chat-footer p-3 bg-white">
                                                        <Form className="d-flex align-items-center" action="#">
                                                            <div className="chat-attagement d-flex">
                                                                <Link to="#"><i className="far fa-smile pe-3" aria-hidden="true"></i></Link>
                                                                <Link to="#"><i className="fa fa-paperclip pe-3" aria-hidden="true"></i></Link>
                                                            </div>
                                                            <Form.Control type="text" className="me-3" placeholder="Type your message"/>
                                                            <Button type="submit" variant="primary d-flex align-items-center"><i className="far fa-paper-plane" aria-hidden="true"></i><span className="d-none d-lg-block ms-1">Send</span></Button>
                                                        </Form>
                                                    </div>
                                                </Tab.Pane>
                                                :
                                                <Tab.Pane eventKey="start" className="tab-pane fade show" id="default-block" role="tabpanel">
                                                <div className="chat-start">
                                                    <span className="iq-start-icon text-primary"><i className="material-symbols-outlined md-42">sms</i></span>
                                                    <Button id="chat-start" sPrefix="btn bg-white mt-3">Start
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
        </>
    )
}
export default Chat;    