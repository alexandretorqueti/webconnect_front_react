
import './Pessoa.css'
import { Row, Col } from 'react-bootstrap';

function PessoaComponent(prop) {
  const { pessoa, children, showHoraLogin, showMensagensNaoLidas } = prop;
  return (
    <Row className="iq-friend-request d-flex justify-content-between">
      <Col className="d-flex foto-nome-avatar align-items-center justify-content-start">
        <div className="d-flex align-items-center">
          <div className={(pessoa.status_online) ? "iq-profile-avatar status-online" : "iq-profile-avatar status-offline"} >
            <img src={pessoa.foto_url} alt="" loading="lazy" className={"avatar-" + prop.avatar + " rounded"}></img>
          </div>
          <Col className="ms-3">
            <h6 className="mb-0 ">{pessoa.nome}</h6>
            {showHoraLogin && <p className="mb-0">{pessoa.hora_ultimo_login_humanizada}</p>}
          </Col>
        </div>
    </Col>
    <Col className="children-content d-flex justify-content-between">{children}</Col>
    {(pessoa.quantidade_de_mensagens_nao_lidas>0 && showMensagensNaoLidas)
         && <Col className="numero-notificacoes bg-soft-primary">{pessoa.quantidade_de_mensagens_nao_lidas}</Col>}
  </Row>)
}
export default PessoaComponent;
