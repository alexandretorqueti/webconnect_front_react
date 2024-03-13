
import {Image} from 'react-bootstrap'

function PessoaLogadaComponent({nome, foto, horaLogado}) {
  return (
    <div className="d-flex align-items-center mb-4">
        <div className="iq-profile-avatar status-online">
            <Image className="rounded-circle avatar-50" src={foto} alt="" loading="lazy"/>
        </div>
        <div className="ms-3">
            <h6 className="mb-0">{nome}</h6>
            <p className="mb-0">{horaLogado}</p>
        </div>
    </div>
  );
}

export default PessoaLogadaComponent;