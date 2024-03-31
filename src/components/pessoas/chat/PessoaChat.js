import {Nav} from 'react-bootstrap'
import '../Pessoa.css'


function PessoaChatComponent({chave, nome, foto, horaLogado, online, numeroNotificacoes, setShowChat}) {
  return (
    <li>
        <Nav.Link eventKey={chave} onClick={() => setShowChat(true)}>
            <div className="d-flex align-items-center">
                <div className="avatar me-2">
                    <img loading="lazy" src={foto} alt="chatuserimage" className="avatar-50 "/>
                    <span className="avatar-status"><i className={online ? "ri-checkbox-blank-circle-fill text-success" : "ri-checkbox-blank-circle-fill text-black"}></i></span>
                </div>
                <div className="chat-sidebar-name">
                    <h6 className="mb-0">{nome}</h6>
                    <span>{horaLogado}</span>
                </div>
                <div className="numero-notificacoes bg-soft-primary">{numeroNotificacoes}</div>
            </div>
        </Nav.Link>
    </li>
);
}

export default PessoaChatComponent;