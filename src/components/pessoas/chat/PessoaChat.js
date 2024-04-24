import {Nav} from 'react-bootstrap'
import '../Pessoa.css'
import FotoPessoa from '../FotoPessoa';


function PessoaChatComponent({chave, pessoa, setShowChat, setPessoaSelecionada}) {
  return (
    <li>
        <Nav.Link eventKey={chave} onClick={() => { setShowChat(true); setPessoaSelecionada(pessoa); } } >
            <div className="d-flex align-items-center">
                <div className="avatar me-2">
                    <FotoPessoa pessoa={pessoa} avatar={50}/>
                    <span className="avatar-status"><i className={pessoa.status_online ? "ri-checkbox-blank-circle-fill text-success" : "ri-checkbox-blank-circle-fill text-light pe-1"}></i></span>
                </div>
                <div className="chat-sidebar-name">
                    <h6 className="mb-0">{pessoa.nome}</h6>
                    <span>{pessoa.hora_ultimo_login_humanizada}</span>
                </div>
                <div className="numero-notificacoes bg-soft-primary">{pessoa.quantidade_de_mensagens_nao_lidas}</div>
            </div>
        </Nav.Link>
    </li>
);
}

export default PessoaChatComponent;


