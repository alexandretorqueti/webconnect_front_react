
import {Image} from 'react-bootstrap'
import './Pessoa.css'

function PessoaComponent({nome, foto, horaLogado, online, numeroNotificacoes}) {
  return (
    <div className="d-flex align-items-center mb-4">
        <div className={(online) ? "iq-profile-avatar status-online" : "iq-profile-avatar status-offline"} >
            <Image className="rounded-circle avatar-50" src={foto} alt="User" loading="lazy"/>
        </div>
        <div className="ms-3">
            <h6 className="mb-0">{nome}</h6>
            <p className="mb-0">{horaLogado}</p>
        </div>
        {(numeroNotificacoes>0) && <div className="numero-notificacoes bg-soft-primary">{numeroNotificacoes}</div>}
    </div>
  );
}

export default PessoaComponent;