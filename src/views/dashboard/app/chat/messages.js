import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Button,Dropdown } from 'react-bootstrap'
import CustomToggle from '../../../../components/dropdowns'

import './chat.css'
import ChatUserDetail from './chatUserDetail'
import ContentChat from './content'
import FormSendMessage from './formSendMessage'

function MessagesComponent({ pessoa, pessoa_logada, setShowChat }) {
  const [showDetail, setShowDetail] = useState(false)
  const [mensagens, setMensagens] = useState(null);
  const divMensagensRef = useRef(null);
  
  return (
    <Tab.Pane  eventKey="chat"  className="fade show active" id="chatbox"  role="tabpanel">
        <div className="chat-head">
            <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
                

                <div className="d-flex align-items-center">
                    <div className="sidebar-toggle">
                        <i className="ri-menu-3-line"></i>
                    </div>
                    <div className="avatar chat-user-profile m-0 me-3" style={{ 'cursor': 'pointer' }} onClick={() => setShowDetail(true)}>
                        <img loading="lazy" src={pessoa.foto_url} alt="avatar" className="avatar-50 " />
                        <span className="avatar-status"><i className="material-symbols-outlined text-success  md-14 filled">circle</i></span>
                    </div>
                    <h5 className="mb-0">{pessoa.nome}</h5>
                </div>
                {showDetail && 
                <div  className={`chat-user-detail-popup-local scroller`}>
                    <div className="user-profile">
                    <Button type="submit" variant=" close-popup p-3" onClick={() => setShowDetail(false)}><i className="material-symbols-outlined md-18" >close</i></Button>
                        <div className="user mb-4  text-center">
                            <Link className="avatar m-0" to="">
                                <img loading="lazy" src={pessoa.foto_url} alt="avatar" className="avatar-50 "/>
                            </Link>
                            <div className="user-name mt-4">
                                <h4>{pessoa.nome}</h4>
                            </div>
                            <div className="user-desc">
                                <p>{pessoa.apresentacao}</p>
                            </div>
                        </div>
                        <hr/>
                        <ChatUserDetail pessoa={pessoa}></ChatUserDetail>
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
                    <Link to="#" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center" onClick={() => { setShowChat(false); }}>
                    <i className="ri-close-fill"></i>
                    </Link>
                </div>
            </header>
        </div>
        <ContentChat pessoa={pessoa} pessoa_logada={pessoa_logada} mensagens={mensagens} setMensagens={setMensagens} divMensagensRef={divMensagensRef} ></ContentChat>
        <FormSendMessage pessoa={pessoa} pessoa_logada={pessoa_logada}></FormSendMessage>
    </Tab.Pane>  );
}

export default MessagesComponent;