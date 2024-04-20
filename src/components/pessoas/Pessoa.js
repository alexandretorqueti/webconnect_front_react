import './Pessoa.css'
import { Container, Dropdown } from 'react-bootstrap';
import CustomToggle from '../dropdowns'
import { useGlobalContext } from '../../GlobalContext';
import { Pessoas } from '../../services/Pessoas';
import { useEffect, useState } from 'react';
import FotoPessoa from './FotoPessoa';

function PessoaComponent(prop) {
  const { pessoa, children, showHoraLogin, showMensagensNaoLidas, avatar } = prop;
  const { pessoa_logada } = useGlobalContext();
  const [ pessoa_local, setPessoaLocal ] = useState(pessoa);
  const PessoaService = new Pessoas();
  const handleFollow = (eusigo) => {
    const run = async () => {
        const pessoa_temp = {...pessoa_local};
        try {
            if (eusigo) {
              await PessoaService.DeixarDeSeguir(pessoa_local.id);
            } else {
              await PessoaService.Seguir(pessoa_local.id);
            }

            setPessoaLocal({...pessoa_temp, euSigo: !eusigo})
        } catch (error) {
            console.log(error);
        }
    }
    run();
  }
  useEffect(() => {
    setPessoaLocal(pessoa);
  }, [pessoa]);
  
  return (
    <Container className="container-pessoa">
      <div className="d-flex">
        <div className="foto-nome-avatar d-flex align-items-center justify-content-start">
          <div className="d-flex align-items-center">
            <div className={(pessoa_local.status_online) ? "iq-profile-avatar status-online" : "iq-profile-avatar status-offline"} >
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic" as={CustomToggle}>
                <FotoPessoa foto_url={pessoa_local.foto_url} avatar={avatar} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-pessoa">
                  <div className="profile-section">
                    <FotoPessoa foto_url={pessoa_local.foto_url} avatar={avatar} />
                    <div className="profile-info">
                      <h6 className="profile-name">Name: <span>{pessoa_local.nome}</span></h6>
                      <p className="profile-email">{pessoa_local.email}</p>
                      <p className="profile-last-login">Last login: <span>{pessoa_local.hora_ultimo_login_humanizada}</span></p>
                    </div>
                  </div>
                  {pessoa_logada.id !== pessoa_local.id && (
                    <div className="action-section">
                      <button className={`btn btn-sm ${pessoa_local.euSigo ? 'btn-secondary' : 'btn-primary'}`} onClick={()=>handleFollow(pessoa_local.euSigo)}>
                        {pessoa_local.euSigo ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                  )}
                </Dropdown.Menu>


              </Dropdown>
            </div>
            <div className="ms-3">
              <h6 className="mb-0 ">{pessoa.nome}</h6>
              {showHoraLogin && <p className="mb-0">{pessoa.hora_ultimo_login_humanizada}</p>}
              {pessoa.quantidade_de_mensagens_nao_lidas > 0 && showMensagensNaoLidas && (
                <div className="numero-notificacoes bg-soft-primary">{pessoa.quantidade_de_mensagens_nao_lidas}</div>
              )}
            </div>
          </div>
        </div>
        <div className="children-content d-flex flex-grow-1 justify-content-end">{children}</div>
      </div>
    </Container>
  );
}

export default PessoaComponent;

