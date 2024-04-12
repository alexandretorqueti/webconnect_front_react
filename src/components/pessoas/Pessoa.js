
import {Image} from 'react-bootstrap'
import './Pessoa.css'

function PessoaComponent(prop) {
  const estilo = 2;
  const { pessoa, children, showHoraLogin, showMensagensNaoLidas } = prop;
  if (estilo === 1)
  return (
    <div className="d-flex justify-content-between">
        <div className='d-flex foto-nome-avatar align-items-center justify-content-start' >
          <div className={(pessoa.status_online) ? "iq-profile-avatar status-online" : "iq-profile-avatar status-offline"} >
              <Image className="rounded-circle avatar-50" src={pessoa.foto_url} alt="User" loading="lazy"/>
          </div>
          <div>
              <h6 className="mb-0">{pessoa.nome}</h6>
              {showHoraLogin && <p className="mb-0">{pessoa.hora_ultimo_login_humanizada}</p>}
          </div>
        </div>
        <div className="children-content d-flex justify-content-between">{children}</div>
        {(pessoa.quantidade_de_mensagens_nao_lidas>0 && showMensagensNaoLidas)
         && <div className="numero-notificacoes bg-soft-primary">{pessoa.quantidade_de_mensagens_nao_lidas}</div>}
    </div>
  );
  else
  return (
    <div className="iq-friend-request d-flex justify-content-between">
      <div className="d-flex foto-nome-avatar align-items-center justify-content-start">
        <div className="d-flex align-items-center">
          <div className={(pessoa.status_online) ? "iq-profile-avatar status-online" : "iq-profile-avatar status-offline"} >
            <img src={pessoa.foto_url} alt="" loading="lazy" className="avatar-30 rounded"></img>
          </div>
          <div className="ms-3">
            <h6 className="mb-0 ">{pessoa.nome}</h6>
            {showHoraLogin && <p className="mb-0">{pessoa.hora_ultimo_login_humanizada}</p>}
          </div>
        </div>
    </div>
    <div className="children-content d-flex justify-content-between">{children}</div>
  </div>)
}
export default PessoaComponent;
